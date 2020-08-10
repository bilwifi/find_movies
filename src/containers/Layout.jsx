import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home"
export default function Layout() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
