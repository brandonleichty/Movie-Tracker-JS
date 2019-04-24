import React, { useState, useEffect } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MovieGrid from "./Components/MovieGrid";
import IntroPage from "./Components/IntroPage";
import useHandleUserMovies from "./Hooks/handleUserMoviesHook";
import Login from "./Components/Login";

import firebase from "./firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const App = () => {
  // Since this is a relatively small app, I'll be storing state required throughout the
  // entire app in the "App" component.

  // Site wide state includes:
  // 1. "user" - if a user is logged in, this will hold the user object returned from Firebase. By defaul it's set to null.

  // 2. "welcomePage" (maybe rename this variable? 🧐) - if it's the user's first time visiting the page, and they're not currently
  //    logged in, users will be shown a welcome screen that invites them to add the first movie to their collection.
  //    welcomePage is set to "true" by default;

  // 3. "movieGrid" is the array that will store all the movies being displayed on the screen. It's an empty array by default.
  //    Once data is fetched from TMDB it'll be filled with movies.

  // 4. "userMovies" is the array that will hold each movie that a user has seen (onces they've clicked on). If no user is logged in,
  //    the users movies will only be stored in the local "App" state. Once a user is logged in, the state will sync in "real time" with Firebase/Firestore.

  // 5. I will be using emojis in my code comments. 🙌 I'm sorry if that offends anyone. 😜

  const [user, setUser] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [userMovies, setUserMovies, setUserMoviesArray] = useHandleUserMovies(
    user,
    loginStatus
  );
  const [navBarLocation, setNavBarLocation] = useState("popular");
  const [query, setQuery] = useState("");
  const [introPage, setIntroPage] = useState(false);

  let unsbuscribeFromFirestore = null;

  useEffect(() => {
    let unsbuscribeFromAuth = firebase
      .auth()
      .onAuthStateChanged(async userData => {
        if (userData) {
          const usersRef = firebase
            .firestore()
            .collection("users")
            .doc(`${userData.uid}`);

          await usersRef
            .get()
            .then(userDoc => {
              if (userDoc.exists) {
                console.log("The user that just logged in ALREADY exist! 🤓");
              } else {
                // console.log("USER DOC");
                // console.log(userDoc);
                // console.log("USER DATA");
                // console.log(userData);
                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${userData.uid}`)
                  .set({
                    name: userData.providerData[0].displayName,
                    lastSignInTime: userData.metadata.lastSignInTime,
                    provider: userData.providerData[0].providerId
                  });

                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${userData.uid}`)
                  .collection("userInfo")
                  .doc("metadata")
                  .set({
                    displayName: userData.displayName,
                    email: userData.email,
                    phone: userData.phoneNumber,
                    creationTime: userData.metadata.creationTime,
                    lastSignInTime: userData.metadata.lastSignInTime,
                    provider: userData.providerData[0].providerId
                  });

                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${userData.uid}`)
                  .collection("moviesByYear")
                  .doc("2019")
                  .set({
                    movies: {}
                  });
                console.log(user);
                console.log(
                  `A user with the name ${
                    user.displayName
                  } was created with the email ${user.email}`
                );
              }
            })
            .then(() => {
              const docRef = firebase
                .firestore()
                .collection("users")
                .doc(`${userData.uid}`)
                .collection("moviesByYear")
                .doc("2019");

              docRef.onSnapshot(function(snapshot) {
                console.log("NEW SNAPSHOT!");
                console.log(snapshot.data().movies);
                setUserMoviesArray(Object.values(snapshot.data().movies));
              });
              setUser(userData);
              setLoginStatus(true);

              console.log(userData);
              console.log("There is a user logged in!");
            });
        } else {
          setUser({});
          setLoginStatus(false);
          setUserMoviesArray([]);
          // No user is signed in.
          console.log("No user is signed in...");
        }
      });

    // returned function will be called on component unmount
    return () => {
      unsbuscribeFromAuth();
    };
  }, []);

  return (
    <Router>
      <Header
        setNavBarLocation={setNavBarLocation}
        navBarLocation={navBarLocation}
        setQuery={setQuery}
        introPage={introPage}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MovieGrid
              movieType={navBarLocation}
              query={query}
              setQuery={setQuery}
              user={user}
              loginStatus={loginStatus}
              userMovies={userMovies}
              setUserMovies={setUserMovies}
              hideNavBar={setIntroPage}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => <Login setUser={setUser} hideNavBar={setIntroPage} />}
        />
      </Switch>
      <Footer loginStatus={loginStatus} user={user} />
    </Router>
  );
};

export default App;
