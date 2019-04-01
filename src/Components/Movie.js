import React from "react";

import addIcon from "../Images/add.svg";
import checkedIcon from "../Images/tick.svg";
const POSTER_PATH = "http://image.tmdb.org/t/p/w500";

const Movie = props => {
  const { movie, userMovies, addOrRemoveUserMovies } = props;

  return (
    <div className="movie-container">
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />

      <button
        className="add-button"
        onClick={() => addOrRemoveUserMovies(movie)}
      >
        {userMovies.some(myMovie => myMovie["id"] === movie.id) ? (
          <img src={checkedIcon} alt="" />
        ) : (
          <img src={addIcon} alt="" />
        )}
      </button>
    </div>
  );
};

export default Movie;
