import React, { useState } from "react";
import { firestore, auth } from "../firebase";

const EmailLogin = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setExistingLogin } = props;

  const handleSubmit = async event => {
    event.preventDefault();

    // 1. Create a firestore user
    // 2. Once the user is created, create a document with the uID
    // 3. If that uID doesn't already exist, create a new document and set the displayName, email, etc.

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // .then(async userData => {
      //   console.log(userData.user);

      //   if (userData) {
      //     const user = userData.user;

      //     console.log("YO!");
      //     const usersRef = firestore.collection("users").doc(`${user.uid}`);

      //     await usersRef.get().then(userDoc => {
      //       console.log("LALALALA");
      //       console.log(userDoc);
      //       if (userDoc.exists) {
      //         console.log("💩");
      //         console.log(userDoc.exists);
      //         console.log(
      //           `The user ${user.displayName} exist! uID: ${user.uid}`
      //         );
      //         firestore
      //           .collection("users")
      //           .doc(`${user.uid}`)
      //           .update({
      //             lastSignInTime: user.metadata.lastSignInTime
      //           });

      //         setUser(user);
      //         console.log(userData);
      //       }
      //     });
      //   }
      // });
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
              <i className="fas fa-at" /> Login with Email
            </span>
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
      <div className="existing-account-signin">
        <span>Don't have an account?</span>{" "}
        <button onClick={() => setExistingLogin(false)}>Sign up.</button>
      </div>
    </div>
  );
};

export default EmailLogin;
