import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  arrayContainer: {
    display: "block",
  },
  noPaper: {
    marginRight: theme.spacing(1),
    float: "left",
  },
  paper: {
    margin: theme.spacing(0.25),
    padding: theme.spacing(0.25),
    float: "left",
  },
}));

export const MakeArrayIntoCells = ({ array, usesPaper }) => {
  const classes = useStyles();
  const theme = useTheme();
  let content = array.map((item, i) =>
    usesPaper ? (
      <Paper
        style={{ background: theme.palette.primary[500] }}
        className={classes.paper}
      >
        <Typography variant="body1" style={{ color: "white" }}>
          {item}
        </Typography>
      </Paper>
    ) : (
      <Typography className={classes.noPaper} variant="body1">
        {item}
        {i < array.length - 1 && ","}
      </Typography>
    )
  );
  return <div className={classes.arrayContainer}>{content}</div>;
};

MakeArrayIntoCells.propTypes = {
  array: PropTypes.array,
  usesPaper: PropTypes.bool,
};
