import React, { Suspense, lazy } from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";

const Home = lazy(() => import("../component/home/home"));

const RoutingComponent = props => {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={Home} />
          
        </Switch>
      </Router>
    </Suspense>
  );
};

export default RoutingComponent;
