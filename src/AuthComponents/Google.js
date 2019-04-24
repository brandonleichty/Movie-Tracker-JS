import React from "react";
import { authenticate } from "../firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const Google = props => {
  return (
    <Link to="/">
      <button className="google-button" onClick={() => authenticate("Google")}>
        <i className="fab fa-google" /> Login with Google
      </button>
    </Link>
  );
};

export default Google;
