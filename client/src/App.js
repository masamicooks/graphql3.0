import React, { useEffect } from "react";
import AppRouter from "./routers/AppRouter";
import ReactGA from "react-ga";

import "normalize.css/normalize.css";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { indigo, red, green, grey } from "@material-ui/core/colors";

// Styles
import "./styles.css";

// Apollo Client + Provider
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/client";

// Assign isMobile property for styling
const isMobile = /iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(
  navigator.userAgent.toLowerCase()
);

const theme = createMuiTheme({
  isMobile,
  typography: {
    fontFamily: "Raleway",
    body1: {
      fontSize: "16px",
      "& .header": {
        fontWeight: 600,
      },
    },
    h2: {
      fontFamily: "Bebas Neue",
      fontSize: "2.75em",
    },
  },
  palette: {
    primary: {
      main: "#0462CC",
    },
    secondary: indigo,
    error: red,
    success: green,
    grey,
  },
});

function App() {
  // Use Google Analytics
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
    // To report page view...
    ReactGA.pageview("/");
  }, []);
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <AppRouter />
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
