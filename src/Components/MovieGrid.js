import React, { useState, useEffect } from "react";
import Movie from "./Movie";

import { useFetchMovies } from "../Hooks/fetchMoviesHook";

const MovieGrid = props => {
  const [movieGrid, setMovieGrid] = useFetchMovies(props.movieType);

  return (
    <div className="movie-grid-container">
      {movieGrid
        .filter(movie => movie.adult === false)
        .map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
    </div>
  );
};

export default MovieGrid;
