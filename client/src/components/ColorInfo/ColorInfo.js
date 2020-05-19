import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const ColorInfo = ({ data }) => {
  let hasData = data > 0;
  return (
    <Typography style={{ color: hasData ? "green" : "red" }}>
      {hasData ? data : "No"} records found.
    </Typography>
  );
};

ColorInfo.propTypes = {
  data: PropTypes.number,
};

export { ColorInfo };
