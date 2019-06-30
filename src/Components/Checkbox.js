import React, { useState } from "react";
import { firestore } from "../firebase";
import bellImage from "../Images/bell.svg";

const toggleMovieTextUpdates = async (movie, user) => {
  const docRef = firestore
    .collection("users")
    .doc(`${user.uid}`)
    .collection("watchList")
    .doc("movies");

  await docRef.get().then(function(doc) {
    if (doc.exists) {
      const docData = doc.data();

      const watchListMovies = { ...docData.movies };

      docRef.update({
        [`movies.${movie.id}.textUpdates`]: !watchListMovies[`${movie.id}`]
          .textUpdates
      });
    }
  });
};

const Checkbox = props => {
  const [checked, setChecked] = useState(false);

  const { movie, user } = props;

  return (
    <div className="toggle-container">
      <div className="toggle-switch">
        <input
          className="toggle-input"
          type="checkbox"
          id={`toggle-${movie.id}`}
          onClick={() => {
            // setChecked(!checked);
            toggleMovieTextUpdates(movie, user);
            console.log("Switch flipped!");
          }}
          checked={!!movie.textUpdates}
        />
        <label className="toggle-slider" for={`toggle-${movie.id}`} />
        <label className="toggle-label" for={`toggle-${movie.id}`}>
          {/* Release reminders are off */}
          {movie.textUpdates ? (
            <i className="fas fa-bell" />
          ) : (
            <i className="far fa-bell-slash" />
          )}
        </label>
        {/* <img src={bellImage} alt="" className="bell-icon" /> */}
      </div>
    </div>
  );
};

export default Checkbox;
