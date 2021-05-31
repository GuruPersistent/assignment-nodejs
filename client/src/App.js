import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Auth>
          <Route path="/dashboard" component={Dashboard} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
