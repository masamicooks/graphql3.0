import React, { useState, Fragment } from "react";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Breaker } from "../Breaker";
import { FilterBox } from "../FilterBox";
import { Checkbox } from "../Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pickerV2: {
    margin: theme.spacing(1),
    marginBottom: "0px",
    width: "50%",
    fontFamily: "Raleway",
  },
  searchContainer: {
    display: "flex",
  },
  searchField: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(1),
  },
}));

const CalendarFilters = (props) => {
  const theme = useTheme();
  const { query, setQuery, senate, setSenate, house, setHouse } = props;
  return (
    <Fragment>
      <Checkbox checked={senate} setChecked={setSenate} />
      <Checkbox checked={house} setChecked={setHouse} />
      <FilterBox query={query} setQuery={setQuery} type={"calendar"} />
      <Breaker height={theme.spacing(2)} />
    </Fragment>
  );
};

CalendarFilters.propTypes = {
  collection: PropTypes.object,
  collections: PropTypes.array,
  field: PropTypes.string,
  setField: PropTypes.func,
  query: PropTypes.string,
  setQuery: PropTypes.func,
  data: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export { CalendarFilters };

//<form className={classes.searchContainer}>
//<div className={classes.searchField}>
//<SearchBox />
//</div>
//<div className={classes.searchField}>
//<Picker loading={loading} value={data ? data.meta.fields : null} />
//</div>
//<div className={classes.searchField}>
//{!error && data && !loading && (
//<ColorInfo data={data.data.totalDocs} />
//)}
//</div>
//</form>
