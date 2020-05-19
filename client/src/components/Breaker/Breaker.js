import React from "react";
import PropTypes from "prop-types";

const Breaker = (props) => {
  return (
    <hr
      style={{ width: "100%", border: "0px", margin: props.height || "0px" }}
    />
  );
};

Breaker.propTypes = {
  height: PropTypes.string,
};

export { Breaker };
