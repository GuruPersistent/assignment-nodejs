import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import AlbumList from "./components/AlbumList";
import TrackList from "./components/TrackList";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Auth>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/albums/:id" component={AlbumList} />
          <Route path="/tracks/:id" component={TrackList} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
