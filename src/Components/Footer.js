import React from "react";
import { firestore, auth, signOut } from "../firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

// At this point the footer is pretty darn basic. I plan on adding a few other simple things such as
// a link to my twitter and an embedded link to brandonleichty.com (or my github since my site isn't up yet).

const Footer = props => {
  const { loginStatus, user } = props;

  return (
    <footer>
      {loginStatus ? (
        <div>
          <span>
            You're logged in as {user.displayName} |{" "}
            <Link to="/" onClick={signOut}>
              Log Out!
            </Link>
            {" | "}
            <Link to="/about">About</Link>
          </span>
        </div>
      ) : (
        <div>
          <span>
            <Link to="login">Login</Link>
            {" | "}
            <Link to="/about">About</Link>
          </span>
        </div>
      )}
      <span className="createdBy">Created in Minnesota by Brandon Leichty</span>
    </footer>
  );
};

export default Footer;
