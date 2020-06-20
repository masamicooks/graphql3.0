import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { MyModal } from "../MyModal";

const useStyles = (theme) => ({
  root: {
    color: "red",
  },
  modalContainer: {
    width: "85vw",
  },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    /// Send an error message to the server...
  }
  render() {
    if (this.state.errorInfo) {
      return (
        <MyModal isModalOpen={true} setIsModalOpen={() => {}}>
          <Typography variant="h4">Uh oh.</Typography>
          <Typography variant="h6">
            {" "}
            Something went wrong. We're sorry about that, why don't you head{" "}
            <a href={`${process.env.REACT_APP_API}`}>home?</a>
          </Typography>
          <details>{this.state.error && this.state.error.toString()}</details>
          <br />
          <details>{this.state.errorInfo.errorStack}</details>
        </MyModal>
      );
    }
    return this.props.children; // If there's no error, just render the children
  }
}

export default withStyles(useStyles)(ErrorBoundary);
