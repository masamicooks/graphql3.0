import React, { Fragment } from "react";

import PropTypes from "prop-types";
import { Breaker } from "../Breaker";
import { ColorInfo } from "../ColorInfo";
import { Picker } from "../Picker";
import { PickerV2 } from "../PickerV2";
import { SearchBox } from "../SearchBox";
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

const DashboardFilters = (props) => {
  const classes = useStyles();
  const { data, error, loading } = props;
  return (
    <Fragment>
      <PickerV2 className={classes.pickerV2} />
      <Breaker />
      <form className={classes.searchContainer}>
        <div className={classes.searchField}>
          <SearchBox />
        </div>
        <div className={classes.searchField}>
          <Picker loading={loading} value={data ? data.meta.fields : null} />
        </div>
        <div className={classes.searchField}>
          {!error && data && !loading && (
            <ColorInfo data={data.data.totalDocs} />
          )}
        </div>
      </form>
    </Fragment>
  );
};

DashboardFilters.propTypes = {
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

export { DashboardFilters };
