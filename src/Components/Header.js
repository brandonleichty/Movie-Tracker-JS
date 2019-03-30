import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./Search";

import logo from "../Images/theater.svg";

const Header = props => {
  const { setNavBarLocation, setQuery, introPage } = props;
  return (
    <header>
      <img src={logo} className="site-hero-logo" alt="movie-tracker-js-logo" />
      <div className="movie-tracker-title">
        <h1>MOVIE TRACKER</h1>
      </div>
      {introPage ? null : (
        <>
          <NavBar setNavBarLocation={setNavBarLocation} />
          <SearchBar setQuery={setQuery} />
        </>
      )}
    </header>
  );
};

export default Header;
