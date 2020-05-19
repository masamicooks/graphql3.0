import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";

import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Contact from "../views/Contact";
import About from "../views/About";
import NotFound from "../views/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRouter = () => (
  <Router history={history}>
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/dashboard/:dataType" component={Dashboard} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  </Router>
);

export default AppRouter;
