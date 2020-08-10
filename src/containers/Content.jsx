import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "../views/Home"
export default function Content() {
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
