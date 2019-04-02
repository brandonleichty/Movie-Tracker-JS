import React, { useState } from "react";
import { firestore, auth } from "../firebase";

const EmailLogin = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = props;

  const handleSubmit = async event => {
    event.preventDefault();

    // 1. Create a firestore user
    // 2. Once the user is created, create a document with the uID
    // 3. If that uID doesn't already exist, create a new document and set the displayName, email, etc.

    try {
      const { userData } = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      if (userData) {
        console.log("YO!");
        const usersRef = await firestore
          .collection("users")
          .doc(`${userData.uid}`);

        usersRef.get().then(userDoc => {
          if (userDoc.exists) {
            console.log(
              `The user ${userData.displayName} exist! uID: ${userData.uid}`
            );
            firestore
              .collection("users")
              .doc(`${userData.uid}`)
              .update({
                lastSignInTime: userData.metadata.lastSignInTime
              });

            setUser(userData);
            console.log(userData);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <h2>Login with email</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default EmailLogin;
