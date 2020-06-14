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

const Headers = ({
  setSortField,
  sortField,
  setSortDirection,
  sortDirection,
  headers,
}) => {
  const classes = useStyles();
  const handleSort = (header) => {
    setSortDirection(sortDirection * -1);
    setSortField(header);
  };

  return headers.map((header, i) => (
    <TableCell onClick={() => handleSort(header)} key={i}>
      <TableSortLabel
        active={header === sortField}
        direction={sortDirection === 1 ? "asc" : "desc"}
        onClick={() => handleSort(header)}
        className={classes.label}
      >
        {capitalize(header)}
      </TableSortLabel>
    </TableCell>
  ));
};

Headers.propTypes = {
  setSortField: PropTypes.func,
  sortField: PropTypes.string,
  setSortDirection: PropTypes.func,
  sortDirection: PropTypes.string,
  headers: PropTypes.array,
};

export { Headers };
