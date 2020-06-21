import React, { useState } from "react";
import { CalendarComponent } from "../../components/CalendarComponent";
import { CalendarFilters } from "../../components/CalendarFilters";
import { Header } from "../../components/Header";
export const Calendar = () => {
  const [query, setQuery] = useState("");
  return (
    <Header>
      <CalendarFilters query={query} setQuery={setQuery} />
      <CalendarComponent query={query} />
    </Header>
  );
};
