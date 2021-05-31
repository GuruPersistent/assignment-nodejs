import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand px-3" to="/dashboard">
          App
        </Link>
        <span className="navbar-text px-3 float-right"><a href="/api/logout">Logout</a></span>
      </div>
    </nav>
  );
}

export default Navbar;
