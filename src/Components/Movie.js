import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

import addIcon from "../Images/add.svg";
import checkedIcon from "../Images/tick.svg";
const POSTER_PATH = "http://image.tmdb.org/t/p/w500";

const Movie = props => {
  // HOOKS
  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const { movie, userMovies, setUserMovies, loginStatus, user } = props;

  return transitions.map(({ item, key, props }) => (
    <animated.div style={props} key={movie.id} className="movie-container">
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />

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
    </animated.div>
  ));
};

export default Movie;
