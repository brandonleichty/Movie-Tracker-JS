import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import LoadMoreMovies from "./LoadMoreMovies";
import EmptyMovies from "./EmptyMovies";
import UserMovieCount from "./UserMovieCount";
import PhoneInput from "./PhoneInput";

import { useFetchMovies } from "../Hooks/fetchMoviesHook";

const MovieGrid = props => {
  const [movieGrid, setMovieGrid] = useFetchMovies(
    props.navBarLocation,
    props.setQuery,
    props.query,
    props.userMovies,
    props.loginStatus
  );

  const {
    userMovies,
    setUserMovies,
    loginStatus,
    user,
    navBarLocation,
    hideNavBar,
    setWatchList,
    watchList,
    pageNum,
    setPageNum,
    sendSmsReleaseReminders
  } = props;

  // Make sure the nav bar is't hidden

  hideNavBar(false);

  return (
    <div>
      {navBarLocation === "myMovies" &&
      userMovies.length === 0 &&
      watchList.length === 0 ? (
        <EmptyMovies loginStatus={loginStatus} />
      ) : (
        <>
          {navBarLocation === "myMovies" && userMovies.length > 0 ? (
            <UserMovieCount
              userMovies={userMovies}
              user={user}
              loginStatus={loginStatus}
            />
          ) : null}
          {navBarLocation === "trending" ||
          navBarLocation === "upcoming" ||
          navBarLocation === "search" ? (
            <div className="movie-grid-container">
              {movieGrid
                .filter(movie => movie.adult === false)
                .filter(movie => movie.poster_path !== null || undefined)
                .map(movie => (
                  <Movie
                    key={movie.id}
                    user={user}
                    movie={movie}
                    loginStatus={loginStatus}
                    userMovies={userMovies}
                    watchList={watchList}
                    setUserMovies={setUserMovies}
                    setWatchList={setWatchList}
                    navBarLocation={navBarLocation}
                  />
                ))}
            </div>
          ) : null}
          {navBarLocation === "myMovies" && userMovies.length > 0 ? (
            <div className="user-movie-grid-container">
              {userMovies.map(movie => (
                <Movie
                  key={movie.id}
                  user={user}
                  movie={movie}
                  loginStatus={loginStatus}
                  userMovies={userMovies}
                  watchList={watchList}
                  setUserMovies={setUserMovies}
                  setWatchList={setWatchList}
                  navBarLocation={navBarLocation}
                />
              ))}
            </div>
          ) : null}
          <>
            {navBarLocation === "myMovies" && watchList.length > 0 ? (
              <>
                <div className="user-watchlist">
                  Upcoming movies you'd like to see...
                </div>
                <div className="user-movie-grid-container">
                  {watchList.map(movie => (
                    <>
                      <Movie
                        key={movie.id}
                        user={user}
                        movie={movie}
                        loginStatus={loginStatus}
                        userMovies={userMovies}
                        watchList={watchList}
                        setUserMovies={setUserMovies}
                        setWatchList={setWatchList}
                        navBarLocation={navBarLocation}
                        sendSmsReleaseReminders={sendSmsReleaseReminders}
                      />
                    </>
                  ))}
                </div>
                {loginStatus && watchList.length > 0 ? (
                  <PhoneInput
                    user={user}
                    sendSmsReleaseReminders={sendSmsReleaseReminders}
                    loginStatus={loginStatus}
                  />
                ) : null}
              </>
            ) : null}
          </>
        </>
      )}
      {navBarLocation === "trending" || navBarLocation === "upcoming" ? (
        <LoadMoreMovies
          movieGrid={movieGrid}
          setMovieGrid={setMovieGrid}
          navBarLocation={navBarLocation}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      ) : null}
    </div>
  );
};

export default MovieGrid;
