import React, { useState, useEffect } from "react";
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
  const [userDisplayName, setUserDisplayName] = useState(null);

  useEffect(() => {
    setUserDisplayName(user.displayName);
  }, [user.displayName]);

  return (
    <footer>
      {loginStatus ? (
        <div>
          <span>
            You're logged in as {userDisplayName} |{" "}
            <Link to="/" onClick={signOut}>
              Log Out!
            </Link>
          </span>
        </div>
      ) : (
        <div>
          <span>
            <Link to="login">Login</Link>
          </span>
        </div>
      )}
      <span className="createdBy">Created in Minnesota by Brandon Leichty</span>
    </footer>
  );
};

export default Footer;
