import React, { useState, Fragment } from "react";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Breaker } from "../Breaker";
import { FilterBox } from "../FilterBox";
import { Checkbox } from "../Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: "inline-block",
    width: "100%",
  },
  filterBox: {
    float: "left",
    display: "inline-block",
  },
  checkboxes: {
    float: theme.isMobile ? "left" : "right",
    display: "flex",
  },
}));

const CalendarFilters = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { query, setQuery, senate, setSenate, house, setHouse } = props;
  return (
    <div className={classes.root}>
      <div className={classes.filterBox}>
        <FilterBox query={query} setQuery={setQuery} type={"calendar"} />
      </div>
      <div className={classes.checkboxes}>
        <Checkbox checked={senate} setChecked={setSenate} label="Senate" />
        <Checkbox checked={house} setChecked={setHouse} label="House" />
      </div>
      <Breaker height={theme.spacing(2)} />
    </div>
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
