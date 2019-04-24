import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import logo from "../Images/theater.svg";

// The header takes in a few props that are responsible for these things:
// 1. "setNavBarLocation" - the reason NavBarLocation is at the root App component instead of in the header
//    is becuase the movieGrid component needs to know where the bar is set. Such as "Popular, Upcoming, Search, My Movies."
//    This is because the TMDB/fetchMoviesHook will make different API calls based upon it's position. And since I didn't want
//    to nest the movieGrid in the Header component, I decided to place it one level higher.

// 2. Much like NavBarLocation, setQuery is also at the top Root level. When NavBarLocation is set to "Search" the MovieGrid
//    component will access the query prop to search TBDB

// 3. If it's the users first visit to the site, or they've visted before but don't have any selected movies, an intro page
//    will be shown if "introPage" is set to false.

const Header = props => {
  const { setNavBarLocation, setQuery, introPage, navBarLocation } = props;
  return (
    <header>
      <Link to="/">
        <img
          src={logo}
          className="site-hero-logo"
          alt="movie-tracker-js-logo"
        />
      </Link>
      <div className="movie-tracker-title">
        <h1>MOVIE TRACKER</h1>
      </div>
      {introPage ? null : (
        <>
          <NavBar
            setNavBarLocation={setNavBarLocation}
            navBarLocation={navBarLocation}
          />
          {/* <SearchBar setQuery={setQuery} /> */}
        </>
      )}
      {navBarLocation === "search" ? <SearchBar setQuery={setQuery} /> : null}
    </header>
  );
};

export default Header;
