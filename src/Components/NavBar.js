import React, { useState, useEffect } from "react";

const NavBar = props => {
  const [active, setActive] = useState(false);
  const { setNavBarLocation, navBarLocation, pageNum, setPageNum } = props;

  // var tabs = $(".tabs");
  // var selector = $(".tabs").find("a").length;
  // //var selector = $(".tabs").find(".selector");
  // var activeItem = tabs.find(".active");
  // var activeWidth = activeItem.innerWidth();
  // $(".selector").css({
  //   left: activeItem.position.left + "px",
  //   width: activeWidth + "px"
  // });

  // $(".tabs").on("click", "a", function(e) {
  //   e.preventDefault();
  //   $(".tabs a").removeClass("active");
  //   $(this).addClass("active");
  //   var activeWidth = $(this).innerWidth();
  //   var itemPos = $(this).position();
  //   $(".selector").css({
  //     left: itemPos.left + "px",
  //     width: activeWidth + "px"
  //   });
  // });

  function logElement(navLocation) {
    const activeWidth = navLocation.current.offsetWidth;
    const itemPosition = navLocation.current.offsetLeft;

    const selector = document.querySelector(".selector");
    selector.style.left = itemPosition + "px";
    selector.style.width = activeWidth + "px";
  }

  const nav1 = React.createRef();
  const nav2 = React.createRef();
  const nav3 = React.createRef();
  const nav4 = React.createRef();

  function navSliderLocation(navBarLocation) {
    if (navBarLocation === "popular") {
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
  }, []);

  return (
    <div className="wrapper">
      <nav className="tabs">
        <div className="selector" />
        <a
          href="#"
          className="active"
          ref={nav1}
          className={navBarLocation === "popular" ? "active" : null}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("popular");
            logElement(nav1);
          }}
        >
          Popular
        </a>
        <a
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
        </a>
        <a
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
        </a>
        <a
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
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
