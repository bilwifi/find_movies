import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./containers/Layout";
function App() {
  return( 
  <Router>
    <Switch>
          <Route path="/">
            <Layout />
          </Route>
        </Switch>
  </Router>
  )}

export default App;
