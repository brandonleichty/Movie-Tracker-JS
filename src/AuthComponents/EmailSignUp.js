import React, { useState } from "react";
import { firestore, auth, signOut } from "../firebase";

const EmailSignUp = props => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = props;

  const currentUTCtime = new Date().toUTCString();

  const handleSubmit = async event => {
    event.preventDefault();

    // 1. Create a firestore user
    // 2. Once the user is created, create a document with the uID
    // 3. If that uID doesn't already exist, create a new document and set the displayName, email, etc.

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const usersRef = await firestore.collection("users").doc(`${user.uid}`);

      // Look into other ways to do this...
      await user
        .updateProfile({
          displayName: displayName
        })
        .then(() => {});

      await usersRef.get().then(userDoc => {
        if (userDoc.exists) {
          console.log(`This user already exist! uID:`);
        } else {
          firestore
            .collection("users")
            .doc(`${user.uid}`)
            .collection("userInfo")
            .doc("metadata")
            .set({
              displayName: displayName,
              email: user.email,
              phone: null,
              photo: null,
              creationTime: currentUTCtime,
              lastSignInTime: currentUTCtime,
              provider: "email"
            });

          firestore
            .collection("users")
            .doc(`${user.uid}`)
            .collection("moviesByYear")
            .doc("2019")
            .set({
              movies: {}
            });
          console.log(user);
        }
      });
      console.log(
        `A user with the name ${user.displayName} was created with the email ${
          user.email
        }`
      );
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
      />
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
      <a className="menu-item log-out" href="#" onClick={signOut}>
        Log Out!
      </a>
    </form>
  );
};

export default EmailSignUp;
