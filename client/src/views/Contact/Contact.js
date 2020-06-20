import React, { useEffect } from "react";
import { Header } from "../../components/Header";
import { useTheme } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./main.scss"; // webpack must be configured to do this

// GQL
import { useQuery } from "@apollo/react-hooks";
import { HOUSE_TABLE_DATA, SENATE_TABLE_DATA } from "../../graphql/queries";

// contact route component
export const Contact = () => {
  const theme = useTheme();
  const { loading, error, data, fetchMore } = useQuery(HOUSE_TABLE_DATA, {
    variables: {
      committee: null,
      sortField: "date",
      sortDirection: -1,
      field: "title",
      query: "",
      offset: 0,
    },
  });
  return (
    <Header>
      {!error && !loading && data && (
        <FullCalendar
          defaultView={theme.isMobile ? "dayGridDay" : "dayGridMonth"}
          plugins={[dayGridPlugin]}
          events={async (fetchInfo, successCallback, failureCallback) => {
            let events = data.data.docs.map((x) => ({
              title: x.title,
              start: new Date(x.date).toISOString(),
            }));
            console.log(events);
            successCallback(events);
            //{ title: "example", start: "2020-06-20T01:01:57.595Z" },
            //data.docs.map((x) => ({ start: x.date, title: x.title }))
            //]);
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
//events={(fetchInfo, successCallback, failureCallback) => {
//console.log(fetchInfo);
//return []
//}}
