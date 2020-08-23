import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Header, Sidebar } from "./components";
import { Order, Menu, Table, Categories } from "./screens";

function App() {
  return (
    <Router>
      <Header />
      <Sidebar />
      <div className="content">
        <Switch>
          <Route path="/order" component={Order} />
          <Route path="/table" component={Table} />
          <Route path="/menu" component={Menu} />
          <Route path="/categories" component={Categories} />
          <Redirect from="/" to="/order" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
