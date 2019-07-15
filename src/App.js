import React, { useState, useEffect } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MovieGrid from "./Components/MovieGrid";
import useHandleUserMovies from "./Hooks/handleUserMoviesHook";
import useHandleWatchList from "./Hooks/handleWatchListHook";
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
  const [watchList, setWatchList, setWatchListArray] = useHandleWatchList(
    user,
    loginStatus
  );
  const [userMovies, setUserMovies, setUserMoviesArray] = useHandleUserMovies(
    user,
    loginStatus
  );

  const [navBarLocation, setNavBarLocation] = useState("trending");
  const [query, setQuery] = useState("");
  const [introPage, setIntroPage] = useState(false);
  const [pageNum, setPageNum] = useState(2);
  const [sendSmsReleaseReminders, setSmsReleaseReminders] = useState(false);

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
                  .collection("userInfo")
                  .doc("preferences")
                  .set({
                    sendSmsReleaseReminders: false
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

                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${userData.uid}`)
                  .collection("watchList")
                  .doc("movies")
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
              const userMoviesDocRef = firebase
                .firestore()
                .collection("users")
                .doc(`${userData.uid}`)
                .collection("moviesByYear")
                .doc("2019");

              const userWatchListDocRef = firebase
                .firestore()
                .collection("users")
                .doc(`${userData.uid}`)
                .collection("watchList")
                .doc("movies");

              const userPreferencesRef = firebase
                .firestore()
                .collection("users")
                .doc(`${userData.uid}`)
                .collection("userInfo")
                .doc("preferences");

              userMoviesDocRef.onSnapshot(function(snapshot) {
                console.log("NEW SNAPSHOT!");
                console.log(snapshot.data().movies);
                setUserMoviesArray(Object.values(snapshot.data().movies));
              });
              userWatchListDocRef.onSnapshot(function(snapshot) {
                console.log("This users Watch List has changed!");
                console.log(snapshot.data().movies);
                setWatchListArray(Object.values(snapshot.data().movies));
              });
              userPreferencesRef.onSnapshot(snapshot => {
                console.log("The users PREFERENCES have changed!");
                setSmsReleaseReminders(snapshot.data().sendSmsReleaseReminders);
                console.log(
                  `Send SMS release reminders? ${
                    snapshot.data().sendSmsReleaseReminders
                  }`
                );
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
          setWatchListArray([]);
          setSmsReleaseReminders(false);
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
        setPageNum={setPageNum}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MovieGrid
              sendSmsReleaseReminders={sendSmsReleaseReminders}
              navBarLocation={navBarLocation}
              query={query}
              setQuery={setQuery}
              user={user}
              loginStatus={loginStatus}
              userMovies={userMovies}
              watchList={watchList}
              setUserMovies={setUserMovies}
              setWatchList={setWatchList}
              hideNavBar={setIntroPage}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              setUser={setUser}
              hideNavBar={setIntroPage}
              setNavBarLocation={setNavBarLocation}
            />
          )}
        />
      </Switch>
      <Footer loginStatus={loginStatus} user={user} hideNavBar={setIntroPage} />
    </Router>
  );
};

export default App;
