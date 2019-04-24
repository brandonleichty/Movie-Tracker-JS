import React from "react";
import { authenticate } from "../firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const Twitter = props => {
  return (
    <Link to="/">
      <button
        className="twitter-button"
        onClick={() => authenticate("Twitter")}
      >
        <i className="fab fa-twitter" /> Login with Twitter
      </button>
    </Link>
  );
};

export default Twitter;
