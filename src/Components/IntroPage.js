import React from "react";
import addIcon from "../Images/add.svg";

// If it's the users first visit to the site, or they've visted before but don't have any selected movies, this intro page
// will be shown if "introPage" prop is set to false. Would like to revist the design of this in the future.

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
