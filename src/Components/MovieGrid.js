import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import LoadMoreMovies from "./LoadMoreMovies";
import EmptyMovies from "./EmptyMovies";
import UserMovieCount from "./UserMovieCount";
import PhoneInput from "./PhoneInput";

import { useFetchMovies } from "../Hooks/fetchMoviesHook";

const MovieGrid = props => {
  const [movieGrid, setMovieGrid] = useFetchMovies(
    props.movieType,
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
    movieType,
    hideNavBar,
    setWatchList,
    watchList,
    pageNum,
    setPageNum,
    sendSmsReleaseReminders
  } = props;

  // Make sure the nav bar is't hidden

  hideNavBar(false);

  // function validate() {
  //   if (document.getElementById("toggle-1").checked) {
  //     console.log("The box is checked!");
  //   } else {
  //     console.log(`he check box isn't checked!`);
  //   }
  // }

  return (
    <div>
      {movieType === "myMovies" && userMovies.length === 0 ? (
        <EmptyMovies loginStatus={loginStatus} />
      ) : (
        <>
          {movieType === "myMovies" && userMovies.length > 0 ? (
            <UserMovieCount
              userMovies={userMovies}
              user={user}
              loginStatus={loginStatus}
            />
          ) : null}
          {movieType === "popular" ||
          movieType === "upcoming" ||
          movieType === "search" ? (
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
                    navBarLocation={movieType}
                  />
                ))}
            </div>
          ) : null}
          {movieType === "myMovies" ? (
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
                  navBarLocation={movieType}
                />
              ))}
            </div>
          ) : null}
          <>
            {movieType === "myMovies" && watchList.length > 0 ? (
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
                        navBarLocation={movieType}
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
      {movieType === "popular" || movieType === "upcoming" ? (
        <LoadMoreMovies
          movieGrid={movieGrid}
          setMovieGrid={setMovieGrid}
          movieType={movieType}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      ) : null}
    </div>
  );
};

export default MovieGrid;
