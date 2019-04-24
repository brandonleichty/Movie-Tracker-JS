import React from "react";
import { authenticate } from "../firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const Github = props => {
  return (
    <Link to="/">
      <button className="github-button" onClick={() => authenticate("Github")}>
        <i className="fab fa-github-alt" /> Login with Github
      </button>
    </Link>
  );
};

export default Github;
