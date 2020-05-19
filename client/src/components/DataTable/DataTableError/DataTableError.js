import { IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";

import { Breaker } from "../../Breaker";

const useStyles = makeStyles((theme) => ({
  errorMsgRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(4),
  },
  paper: {
    width: theme.isMobile ? "80vw" : "400px",
    padding: theme.spacing(2),
    background: "white",
  },
  refreshIcon: {
    paddingRight: theme.spacing(1),
  },
}));

const DataTableError = ({
  error,
  fetchMore,
  committee,
  field,
  query,
  offset,
}) => {
  const classes = useStyles();
  const message = error.message;

  const handleTryAgain = () => {
    alert("Trying to fetch again");
  };

  return (
    <div className={classes.errorMsgRoot}>
      <Paper className={classes.paper}>
        <Typography variant="h5" style={{ color: "red" }}>
          {message}
        </Typography>
        <Breaker height="10px" />
        <Typography>
          This probably was something on our end, either our servers are down or
          there is too much traffic right now.
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleTryAgain}
          className={classes.menuButton}
        >
          <RefreshIcon className={classes.refreshIcon} />
          <Typography>Try again?</Typography>
        </IconButton>
      </Paper>
    </div>
  );
};

DataTableError.propTypes = {
  error: PropTypes.object,
  fetchMore: PropTypes.func,
};

export { DataTableError };
