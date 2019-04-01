import React from "react";

const NavBar = props => {
  const { setNavBarLocation } = props;

  return (
    <div className="main-nav">
      <button
        label="Popular"
        onClick={() => {
          setNavBarLocation("popular");
        }}
      >
        Popular
      </button>
      <button
        label="Search"
        onClick={() => {
          setNavBarLocation("search");
        }}
      >
        Search
      </button>
      <button
        label="Upcoming"
        onClick={() => {
          setNavBarLocation("upcoming");
        }}
      >
        Upcoming
      </button>
      <button
        label="My Movies"
        onClick={() => {
          setNavBarLocation("myMovies");
        }}
      >
        My Movies{" "}
      </button>
    </div>
  );
};

export default NavBar;
