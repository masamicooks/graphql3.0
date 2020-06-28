import React, { useState } from "react";
import { CalendarComponent } from "../../components/CalendarComponent";
import { CalendarFilters } from "../../components/CalendarFilters";
import { Header } from "../../components/Header";
export const Calendar = () => {
  const [query, setQuery] = useState("");
  const [senate, setSenate] = useState(true);
  const [house, setHouse] = useState(true);
  return (
    <Header>
      <CalendarFilters
        query={query}
        house={house}
        setHouse={setHouse}
        senate={senate}
        setSenate={setSenate}
        setQuery={setQuery}
      />
      <CalendarComponent query={query} senate={senate} house={house} />
    </Header>
  );
};
