import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useProgressStyles = makeStyles((theme) => ({
  progress: { margin: theme.spacing(2) },
}));

const Loading = () => {
  const classes = useProgressStyles();
  return <CircularProgress className={classes.progress} />;
};

export { Loading };
