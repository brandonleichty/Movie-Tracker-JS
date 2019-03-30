import React from "react";

const POSTER_PATH = "http://image.tmdb.org/t/p/w500";

const Movie = props => {
  const { movie } = props;

  return (
    <div className="movie-container">
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />

      <button className="add-button" />
    </div>
  );
};

export default Movie;
