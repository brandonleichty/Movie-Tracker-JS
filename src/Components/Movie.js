import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import moment from "moment";
import Checkbox from "./Checkbox";

import addIcon from "../Images/add.svg";
import calendarAddIcon from "../Images/calendar-add.svg";
import calendarCheckIcon from "../Images/calendar-check-solid.svg";
import checkedIcon from "../Images/tick.svg";
const POSTER_PATH = "http://image.tmdb.org/t/p/w500";

const Movie = props => {
  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const {
    movie,
    userMovies,
    setUserMovies,
    loginStatus,
    user,
    navBarLocation,
    setWatchList,
    watchList,
    sendSmsReleaseReminders
  } = props;

  const releaseDate = moment(movie.release_date);

  const todaysDate = moment();

  return transitions.map(({ item, key, props }) => (
    <animated.div
      style={props}
      key={movie.id}
      className={
        navBarLocation === "myMovies"
          ? "user-movie-container"
          : "movie-container"
      }
    >
      <div className="movie-poster-container">
        <img
          src={`${POSTER_PATH}${movie.poster_path}`}
          alt={movie.title}
          title={movie.title}
          className="movie-poster"
        />
      </div>
      {navBarLocation === "popular" ? (
        <button
          className="add-button"
          onClick={() => setUserMovies(movie, user, loginStatus)}
        >
          {userMovies.some(myMovie => myMovie["id"] === movie.id) ? (
            <img src={checkedIcon} alt="" />
          ) : (
            <img src={addIcon} alt="" />
          )}
        </button>
      ) : null}

      {navBarLocation === "upcoming" ? (
        <button
          className="add-button calendar-button"
          onClick={() => setWatchList(movie, user, loginStatus)}
        >
          {watchList.some(
            watchListMovie => watchListMovie["id"] === movie.id
          ) ? (
            <img src={checkedIcon} alt="" />
          ) : (
            <img src={calendarAddIcon} alt="" />
          )}
          <div className="movieButtonDate">{releaseDate.format("MMM Do")}</div>
        </button>
      ) : null}

      {navBarLocation === "myMovies" ? (
        <>
          {watchList.some(
            watchListMovie => watchListMovie["id"] === movie.id
          ) ? (
            <>
              {sendSmsReleaseReminders && loginStatus ? (
                <Checkbox movie={movie} user={user} />
              ) : null}
            </>
          ) : null}
        </>
      ) : null}

      {navBarLocation === "search" ? (
        <>
          {releaseDate <= todaysDate ? (
            <button
              className="add-button"
              onClick={() => setUserMovies(movie, user, loginStatus)}
            >
              {userMovies.some(myMovie => myMovie["id"] === movie.id) ? (
                <img src={checkedIcon} alt="" />
              ) : (
                <img src={addIcon} alt="" />
              )}
            </button>
          ) : (
            <button
              className="add-button calendar-button"
              onClick={() => setWatchList(movie, user, loginStatus)}
            >
              {watchList.some(
                watchListMovie => watchListMovie["id"] === movie.id
              ) ? (
                <img src={checkedIcon} alt="" />
              ) : (
                <img src={calendarAddIcon} alt="" />
              )}
              <div className="movieButtonDate">
                {releaseDate.format("MMM Do")}
              </div>
            </button>
          )}
        </>
      ) : null}
    </animated.div>
  ));
};

export default Movie;
