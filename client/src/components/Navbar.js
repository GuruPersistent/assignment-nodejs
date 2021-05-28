import React from "react";

function Navbar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand px-3" href="#">
          App
        </a>
        <span className="navbar-text px-3 float-right"><a href="/api/logout">Logout</a></span>
      </div>
    </nav>
  );
}

export default Navbar;
