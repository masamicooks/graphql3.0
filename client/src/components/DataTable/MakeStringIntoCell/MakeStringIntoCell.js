import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@material-ui/core";

import LinkIcon from "@material-ui/icons/Link";
import goToLink from "../../../util/goToLink";
import isValidUrl from "../../../util/isValidUrl";

const MakeStringIntoCell = ({ col, string }) => {
  let isUrl = isValidUrl(string.trim());
  if (!isUrl) {
    if (col === "date" || col === "time") {
      let momentified = moment(string)
      string = momentified.isValid() ? moment(string).format(col === "date" ? "LL" : "LT") : string;
    }
    return <Typography variant="body1">{string}</Typography>;
  }
  let url = new URL(string);
  return (
    <IconButton
      color="inherit"
      aria-label="Open drawer"
      edge="start"
      onClick={() => goToLink(url.href)}
    >
      <LinkIcon />
    </IconButton>
  );
};

MakeStringIntoCell.propTypes = {
  string: PropTypes.string,
};

export { MakeStringIntoCell };
