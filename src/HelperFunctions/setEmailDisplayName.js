import React, { useState } from "react";
import { firestore, auth, signOut } from "../firebase";

const setEmailDisplayName = async (userData, displayName) => {
  if (userData) {
    const user = userData.user;
    const usersRef = firestore.collection("users").doc(`${user.uid}`);

    await usersRef.get().then(userDoc => {
      if (userDoc.exists) {
        usersRef.set({
          name: displayName,
          provider: "email"
        });

        usersRef.updateProfile({
          displayName: displayName
        });
      } else {
        console.log("There was an error setting the user's display name.");
        console.log(userDoc);
      }
    });
  }
};

export default setEmailDisplayName;
