import React from "react";

import logo from "../Images/theater.svg";

const Header = () => {
  return (
    <header>
      <img src={logo} className="site-hero-logo" alt="movie-tracker-js-logo" />
      <div className="movie-tracker-title">
        <h1>MOVIE TRACKER</h1>
      </div>
    </header>
  );
};

export default Header;
