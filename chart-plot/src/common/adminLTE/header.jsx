import React from "react";

export default ({ name }) => (
  <header className="main-header">
    <nav className="navbar-nav">
      <div className="navbar-header">
        <h3 className="navbar-brand">{`{${name}}'s Challenge`}</h3>
      </div>
    </nav>
  </header>
);
