import React, { useState, useEffect } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MovieGrid from "./Components/MovieGrid";
import IntroPage from "./Components/IntroPage";
import useHandleUserMovies from "./Hooks/handleUserMoviesHook";

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

  const [user, setUser] = useState(null);
  const [userMovies, addOrRemoveUserMovies] = useHandleUserMovies();
  // const [movieType, setMovieType] = useState("popular");
  const [navBarLocation, setNavBarLocation] = useState("popular");
  const [query, setQuery] = useState("");
  const [introPage, setIntroPage] = useState(true);

  return (
    <>
      <Header
        setNavBarLocation={setNavBarLocation}
        setQuery={setQuery}
        introPage={introPage}
      />
      {introPage ? (
        <IntroPage setIntroPage={setIntroPage} />
      ) : (
        <MovieGrid
          movieType={navBarLocation}
          query={query}
          userMovies={userMovies}
          addOrRemoveUserMovies={addOrRemoveUserMovies}
        />
      )}

      <Footer />
    </>
  );
};

export default App;
