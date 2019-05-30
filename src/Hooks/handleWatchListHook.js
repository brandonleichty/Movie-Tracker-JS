import { useState, useEffect } from "react";

import { firestore } from "../firebase";

const useHandleWatchList = () => {
  const [userWatchListArray, setUserWatchListArray] = useState([]);

  // If a user is logged in, save the movies to the users Firestore movie collection.
  // Otherwise save the users movies to the local state without using a DB.

  const setUserWatchList = async (selectedMovie, user, loginStatus) => {
    const docRef = firestore
      .collection("users")
      .doc(`${user.uid}`)
      .collection("watchList")
      .doc("movies");

    if (loginStatus) {
      if (userWatchListArray.some(movie => movie["id"] === selectedMovie.id)) {
        console.log(`You clicked on: ${selectedMovie.title}`);
        docRef.get().then(doc => {
          const docData = doc.data();
          delete docData.movies[selectedMovie.id];
          const newDocData = {
            ...docData,
            movies: {
              ...docData.movies
            }
          };
          docRef.update(newDocData);
        });
      } else {
        console.log(`You clicked on: ${selectedMovie.title}`);
        await docRef.get().then(function(doc) {
          if (doc.exists) {
            console.log("The doc exist!");
            const docData = doc.data();
            const newDocData = {
              movies: {
                [selectedMovie.id]: {
                  id: selectedMovie.id,
                  title: selectedMovie.title,
                  release_date: selectedMovie.release_date,
                  poster_path: selectedMovie.poster_path,
                  adult: selectedMovie.adult,
                  textUpdates: false
                },
                ...docData.movies
              }
            };
            docRef.update(newDocData);
            console.log(doc.data());
          }
        });
      }
    } else if (loginStatus === false) {
      if (userWatchListArray.some(movie => movie["id"] === selectedMovie.id)) {
        // Remove movie to myMovies list
        setUserWatchListArray(
          userWatchListArray.filter(movie => movie.id !== selectedMovie.id)
        );
      } else {
        // Add the movie to the userMovies list.
        console.log(selectedMovie);

        const newMovieObject = {
          title: selectedMovie.title,
          id: selectedMovie.id,
          release_date: selectedMovie.release_date,
          poster_path: selectedMovie.poster_path,
          adult: selectedMovie.adult,
          textUpdates: false
        };
        console.log(newMovieObject);
        setUserWatchListArray([...userWatchListArray, newMovieObject]);
      }
    }
  };

  return [userWatchListArray, setUserWatchList, setUserWatchListArray];
};

export default useHandleWatchList;
