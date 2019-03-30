import React from "react";
import addIcon from "../Images/add.svg";

const IntroPage = props => {
  const { setIntroPage } = props;

  return (
    <div className="add-first-movie">
      <div className="first-movie-div" onClick={() => setIntroPage(false)}>
        <img src={addIcon} alt="" />
        <p>
          Add a movie that you've seen
          <br />
          this year!{" "}
          <span role="img" aria-label="Popcorn">
            🍿
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default IntroPage;
