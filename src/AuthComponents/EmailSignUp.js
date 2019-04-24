import React, { useState } from "react";
import { firestore, auth, signOut } from "../firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const EmailSignUp = props => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setExistingLogin } = props;

  const currentUTCtime = new Date().toUTCString();

  const handleSubmit = async event => {
    event.preventDefault();

    // 1. Create a firestore user
    // 2. Once the user is created, create a document with the uID
    // 3. If that uID doesn't already exist, create a new document and set the displayName, email, etc.

    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="email-container">
        <form className="SignUp" onSubmit={handleSubmit}>
          <div>
            <span>
              <i className="fas fa-at" /> Sign up with Email
            </span>
          </div>
          <div className="display-name-input">
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
          </div>
          <div className="email-input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="password-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
      <div className="email-signup-back-button">
        <button onClick={() => setExistingLogin(true)}>Back</button>
      </div>
    </div>
  );
};

export default EmailSignUp;
