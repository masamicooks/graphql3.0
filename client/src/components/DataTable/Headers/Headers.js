import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import capitalize from "../../../util/capitalize";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: "16px",
  },
}));

const Headers = ({ setSortBy, sortBy, sortOrder, setSortOrder, headers }) => {
  const classes = useStyles();
  const handleSort = (header) => {
    setSortOrder(!sortOrder);
    setSortBy(header);
  };
  return headers.map((header, i) => (
    <TableCell onClick={() => handleSort(header)} key={i}>
      <TableSortLabel
        active={header === sortBy}
        direction={sortOrder ? "asc" : "desc"}
        onClick={() => handleSort(header)}
        className={classes.label}
      >
        {capitalize(header)}
      </TableSortLabel>
    </TableCell>
  ));
};

Headers.propTypes = {
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.bool,
  setSortOrder: PropTypes.func,
  headers: PropTypes.array,
};

export { Headers };
