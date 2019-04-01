import React, { useState, useEffect } from "react";
import Movie from "./Movie";

import { useFetchMovies } from "../Hooks/fetchMoviesHook";

const MovieGrid = props => {
  const [movieGrid, setMovieGrid] = useFetchMovies(
    props.movieType,
    props.query,
    props.userMovies
  );

  const { userMovies, addOrRemoveUserMovies } = props;
  return (
    <div className="movie-grid-container">
      {movieGrid
        .filter(movie => movie.adult === false)
        .map(movie => (
          <Movie
            key={movie.id}
            movie={movie}
            userMovies={userMovies}
            addOrRemoveUserMovies={addOrRemoveUserMovies}
          />
        ))}
    </div>
  );
};

export default MovieGrid;
