import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import { Breaker } from "../Breaker";
import { MakeArrayIntoCells } from "../MakeArrayIntoCells";
import capitalize from "../../util/capitalize";

const useStyles = makeStyles((theme) => ({
  myModal: {
    "& :focus": {
      outline: "none",
    },
  },
  modalContent: {
    display: "flex",
    flexDirection: "row",
    "& .header": {
      paddingRight: theme.spacing(1),
      fontWeight: 700,
    },
  },
  arrayHolder: {},
  paper: {
    position: "absolute",
    width: theme.isMobile ? "90vw" : "500px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TableRowModalContent = ({ data }) => {
  // Only display keys with values
  let keys = Object.keys(data).filter((x) => {
    if (data[x] === null || data[x] === undefined) {
      return false;
    }
    if (Array.isArray(data[x])) {
      return data[x].length > 0;
    }
    return true;
  });

  const theme = useTheme();
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6">
        <a style={{ color: theme.palette.primary[500] }} href={data.link}>
          {data.title}
        </a>
      </Typography>
      <Breaker />
      {keys
        .filter((x) => x !== "title" && x !== "link" && x !== "_id")
        .map((x, i) => (
          <div key={i} className={classes.modalContent}>
            <Typography variant="body1" className="header">{`${capitalize(
              x
            )}: `}</Typography>
            {typeof data[x] === "string" ? (
              <Typography variant="body1">{data[x]}</Typography>
            ) : (
              <MakeArrayIntoCells array={data[x]} />
            )}
          </div>
        ))}
    </React.Fragment>
  );
};

TableRowModalContent.propTypes = {
  data: PropTypes.object,
};

export default TableRowModalContent;
