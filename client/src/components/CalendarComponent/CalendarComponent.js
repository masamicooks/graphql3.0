import React, { useRef, useState } from "react";
import moment from "moment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tippy from "tippy.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import getCollectionName from "../../util/getCollectionName";
import getDatabase from "../../util/getDatabase";

import "tippy.js/dist/tippy.css"; // Tooltip styling
import "tippy.js/themes/light.css"; //
import "./main.scss"; // Calendar styling

// GQL
import { useQuery } from "@apollo/react-hooks";
import { CAL_DATA } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  calendar: {
    fontFamily: theme.typography.fontFamily,
  },
}));
// contact route component
export const CalendarComponent = (props) => {
  // Set state
  const { query, house, senate } = props;
  const theme = useTheme();
  const [calHeight, setCalHeight] = useState(
    window.innerHeight - theme.mixins.toolbar.minHeight * 2 - theme.spacing(6)
  );
  const [eventLimit, setEventLimit] = useState(3);
  const classes = useStyles();
  const date = useRef(new Date());

  // Resize
  React.useEffect(() => {
    const handleResize = () => {
      let height =
        window.innerHeight -
        theme.mixins.toolbar.minHeight * 2 -
        theme.spacing(3);
      setCalHeight(height);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // Fetch data
  const { loading, error, data, fetchMore } = useQuery(CAL_DATA, {
    variables: {
      houseHearings: house,
      senateHearings: senate,
      start: date.current,
      end: date.current,
    },
  });

  const viewRender = (info) => {
    let viewType = info.view.type;
    if (viewType === "dayGridWeek") {
      setEventLimit(false);
    } else {
      setEventLimit(3);
    }
  };

  // When events render, modify them with this function...
  const eventRender = (info) => {
    info.el.target = "_blank";
    if (!theme.isMobile) {
      new Tippy(info.el, {
        content: info.event.id,
        duration: 0,
        theme: "light",
      });
    }
  };

  const eventClick = (e) => {
    //window.open()
    console.log(e.url);
    return false;
  };

  return (
    <React.Fragment>
      {!error && !loading && data && (
        <FullCalendar
          themeSystem="bootstrap"
          className={classes.calendar}
          defaultView={theme.isMobile ? "dayGridDay" : "dayGridMonth"}
          plugins={[dayGridPlugin, bootstrapPlugin]}
          eventLimit={!theme.isMobile ? eventLimit : false}
          eventRender={eventRender}
          eventClick={eventClick}
          viewSkeletonRender={viewRender}
          events={async (fetchInfo, successCallback, failureCallback) => {
            let results = await fetchMore({
              variables: {
                start: fetchInfo.start,
                end: fetchInfo.end,
              },
              updateQuery: (previousResult, { fetchMoreResult }) =>
                fetchMoreResult,
            });
            successCallback(
              results.data.data
                .filter((x) => {
                  let myRegex = new RegExp(query, "gi");
                  let isTitle = x.title.match(myRegex);
                  let isCollection = getCollectionName(x.committee).match(
                    myRegex
                  );
                  return isTitle || isCollection;
                })
                .map((x) => ({
                  id: x.title, // Instead of using id, pass the title...
                  title: theme.isMobile
                    ? `${getCollectionName(x.committee)}: ${x.title}`
                    : getCollectionName(x.committee),
                  start: moment(`${x.date} ${x.time}`, "LL LT").toISOString(),
                  allDay: !x.time,
                  ok: "SDFSD",
                  url: x.link,
                  backgroundColor:
                    getDatabase(x.committee) === "Senate"
                      ? "#F3F3F3"
                      : "#c4c4c4",
                  textColor: "black",
                  borderColor: "#F3F3F3",
                }))
            );
          }}
          header={{
            left: theme.isMobile
              ? "prev,next"
              : "prevYear,prev,next,today,nextYear",
            center: "title",
            right: theme.isMobile ? "" : "dayGridWeek,dayGridMonth",
          }}
          height={calHeight}
        />
      )}
      {!loading && !data && error && <div>There was an error</div>}
    </React.Fragment>
  );
};
