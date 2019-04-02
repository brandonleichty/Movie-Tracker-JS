import React, { useState, useEffect } from "react";
import Movie from "./Movie";

import { useFetchMovies } from "../Hooks/fetchMoviesHook";

const MovieGrid = props => {
  const [movieGrid, setMovieGrid] = useFetchMovies(
    props.movieType,
    props.query,
    props.userMovies
  );

  const { userMovies, setUserMovies, loginStatus, user } = props;
  return (
    <div className="movie-grid-container">
      {movieGrid
        .filter(movie => movie.adult === false)
        .map(movie => (
          <Movie
            key={movie.id}
            user={user}
            movie={movie}
            loginStatus={loginStatus}
            userMovies={userMovies}
            setUserMovies={setUserMovies}
          />
        ))}
    </div>
  );
};

export default MovieGrid;
