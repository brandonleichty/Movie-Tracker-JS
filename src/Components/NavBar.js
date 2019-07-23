import React, { useState, useEffect, useRef } from "react";

const NavBar = props => {
  const [active, setActive] = useState(false);
  const { setNavBarLocation, navBarLocation, pageNum, setPageNum } = props;
  const [windowSize, setWindowWidth] = useState(null);

  var resizeTimer;

  window.addEventListener("resize", function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      setWindowWidth(window.innerWidth);
    }, 501);
  });

  function logElement(navLocation) {
    const activeWidth = navLocation.current.offsetWidth;
    const itemPosition = navLocation.current.offsetLeft;

    const selector = document.querySelector(".selector");

    if (navBarLocation === "trending" && windowSize > 613) {
      selector.style.left = itemPosition + "px";
      selector.style.width = "120px";
    } else if (navBarLocation === "trending" && windowSize < 613) {
      selector.style.left = itemPosition + "px";
      selector.style.width = "72px";
    } else {
      selector.style.left = itemPosition + "px";
      selector.style.width = activeWidth + "px";
    }

    // console.log(`Selector left: ${navLocation.current.client}`);
    console.log(`Selector width: ${navLocation.current.clientWidth}`);
  }

  const nav1 = useRef(null);
  const nav2 = useRef(null);
  const nav3 = useRef(null);
  const nav4 = useRef(null);

  function navSliderLocation(navBarLocation) {
    if (navBarLocation === "trending") {
      return nav1;
    }
    if (navBarLocation === "upcoming") {
      return nav2;
    }
    if (navBarLocation === "myMovies") {
      return nav3;
    }
    if (navBarLocation === "search") {
      return nav4;
    }
  }

  useEffect(() => {
    logElement(navSliderLocation(navBarLocation));
    console.log("IT WORKED!!");
  }, [navBarLocation, windowSize]);

  // useEffect(() => {
  //   logElement(navSliderLocation(navBarLocation));
  //   console.log("WINDOW SIZE WORKED!");
  // }, [windowSize]);

  return (
    <div className="wrapper">
      <nav className="tabs">
        <div className="selector" />
        <button
          href="#"
          ref={nav1}
          className={navBarLocation === "trending" ? "active" : null}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("trending");
            logElement(nav1);
          }}
        >
          Trending
        </button>
        <button
          className={navBarLocation === "upcoming" ? "active" : null}
          ref={nav2}
          href="#"
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("upcoming");
            logElement(nav2);
            setPageNum(2);
          }}
        >
          Upcoming
        </button>
        <button
          href="#"
          ref={nav3}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("myMovies");
            logElement(nav3);
            setPageNum(2);
          }}
          className={navBarLocation === "myMovies" ? "active" : null}
        >
          My Movies
        </button>
        <button
          href="#"
          ref={nav4}
          className={navBarLocation === "search" ? "active" : null}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("search");
            logElement(nav4);
          }}
        >
          Search
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
