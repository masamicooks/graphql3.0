import React, { useRef } from "react";
import moment from "moment";
import { Header } from "../Header";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tippy from "tippy.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGridPlugin from "@fullcalendar/timegrid";
import getCollectionName from "../../util/getCollectionName";

import "tippy.js/dist/tippy.css"; // Tooltip styling
import "tippy.js/themes/light.css"; //
import "./main.scss"; // Calendar styling

// GQL
import { useQuery } from "@apollo/react-hooks";
import { HOUSE_CAL_DATA } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  calendar: {
    color: "red",
    fontFamily: theme.typography.fontFamily,
  },
}));
// contact route component
export const CalendarComponent = () => {
  const theme = useTheme();
  const classes = useStyles();
  const date = useRef(new Date());
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
    <Header>
      {!error && !loading && data && (
        <FullCalendar
          className={classes.calendar}
          defaultView={theme.isMobile ? "dayGridDay" : "dayGridMonth"}
          plugins={[dayGridPlugin]}
          eventRender={eventRender}
          eventLimit={true}
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
              results.data.data.map((x) => ({
                id: x.title, // Instead of using id, pass the title...
                title: theme.isMobile
                  ? `${getCollectionName(x.committee)}: ${x.title}`
                  : getCollectionName(x.committee),
                start: moment(`${x.date} ${x.time}`, "LL LT").toISOString(),
                allDay: !x.time,
                url: x.link,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
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
          height={window.innerHeight - theme.mixins.toolbar.minHeight * 2}
        />
      )}
      {!loading && !data && error && <div>There was an error</div>}
    </Header>
  );
};
