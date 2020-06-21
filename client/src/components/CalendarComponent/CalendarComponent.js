import React, { useRef } from "react";
import moment from "moment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tippy from "tippy.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import getCollectionName from "../../util/getCollectionName";
import { Header } from "../../components/Header";

import "tippy.js/dist/tippy.css"; // Tooltip styling
import "tippy.js/themes/light.css"; //
import "./main.scss"; // Calendar styling

// GQL
import { useQuery } from "@apollo/react-hooks";
import { HOUSE_CAL_DATA } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  calendar: {
    fontFamily: theme.typography.fontFamily,
  },
}));
// contact route component
export const CalendarComponent = (props) => {
  const { query } = props;
  const theme = useTheme();
  console.log(theme);
  const [calHeight, setCalHeight] = React.useState(
    window.innerHeight - theme.mixins.toolbar.minHeight * 2 - theme.spacing(3)
  );
  const classes = useStyles();
  const date = useRef(new Date());
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
  const { loading, error, data, fetchMore } = useQuery(HOUSE_CAL_DATA, {
    variables: {
      start: date.current,
      end: date.current,
    },
  });
  const eventRender = (info) => {
    if (!theme.isMobile) {
      new Tippy(info.el, {
        content: info.event.id,
        duration: 0,
        theme: "light",
      });
    }
  };
  return (
    <React.Fragment>
      {!error && !loading && data && (
        <FullCalendar
          themeSystem="bootstrap"
          className={classes.calendar}
          defaultView={theme.isMobile ? "dayGridDay" : "dayGridMonth"}
          plugins={[dayGridPlugin, bootstrapPlugin]}
          eventLimit={!theme.isMobile ? 3 : false}
          eventRender={eventRender}
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
                  url: x.link,
                  backgroundColor: "#F3F3F3", // theme.palette.secondary.main,
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
