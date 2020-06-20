import React, { useEffect, useRef } from "react";
import moment from "moment";
import { Header } from "../../components/Header";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import getCollectionName from "../../util/getCollectionName";

import "./main.scss"; // webpack must be configured to do this

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
export const Calendar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const date = useRef(new Date());
  const { loading, error, data, fetchMore } = useQuery(HOUSE_CAL_DATA, {
    variables: {
      start: date.current,
      end: date.current,
    },
  });
  return (
    <Header>
      {!error && !loading && data && (
        <FullCalendar
          className={classes.calendar}
          defaultView={theme.isMobile ? "dayGridDay" : "dayGridMonth"}
          plugins={[dayGridPlugin]}
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
                id: x._id,
                title: getCollectionName(x.committee),
                start: moment(`${x.date} ${x.time}`, "LL LT").toISOString(),
                allDay: !x.time,
                url: x.link,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
              }))
            );
          }}
          header={{
            left: "prev,next,today",
            center: "title",
            right: "",
          }}
          height={window.innerHeight - theme.mixins.toolbar.minHeight * 2}
        />
      )}
      {!loading && !data && error && <div>There was an error</div>}
    </Header>
  );
};
