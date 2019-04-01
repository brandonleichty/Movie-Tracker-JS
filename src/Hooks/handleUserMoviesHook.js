import { useState, useEffect } from "react";

const useHandleUserMovies = () => {
  const [userMovies, setUserMovies] = useState([]);

  const addOrRemoveUserMovies = selectedMovie => {
    if (userMovies.some(movie => movie["id"] === selectedMovie.id)) {
      // Remove movie to myMovies list
      setUserMovies(userMovies.filter(movie => movie.id !== selectedMovie.id));
    } else {
      // Add the movie to the userMovies list.
      console.log(selectedMovie);

      const newMovieObject = {
        title: selectedMovie.title,
        id: selectedMovie.id,
        release_date: selectedMovie.release_date,
        poster_path: selectedMovie.poster_path,
        adult: selectedMovie.adult
      };
      console.log(newMovieObject);
      setUserMovies([...userMovies, newMovieObject]);
    }
  };

  return [userMovies, addOrRemoveUserMovies];
};

export default useHandleUserMovies;

//     if (user !== null) {
//       db.collection("users")
//         .doc(`${user.uid}`)
//         .get()
//         .then(doc => {
//           const docData = doc.data();
//           delete docData.movies[movieObject.id];
//           const newDocData = {
//             ...docData,
//             movies: {
//               ...docData.movies
//             }
//           };
//           db.collection("users")
//             .doc(`${user.uid}`)
//             .update(newDocData);
//         });
//     }
//   } else {
//     // Add movie to myMovies list
//     this.setState({
//       // myMovies: myMovies.concat(movieObject.id),
//       myMoviesArray: [...myMoviesArray, movieObject]
//     });

//     if (user !== null) {
//       db.collection("users")
//         .doc(`${user.uid}`)
//         .get()
//         .then(doc => {
//           const docData = doc.data();
//           const newDocData = {
//             ...docData,
//             movies: {
//               [movieObject.id]: {
//                 id: movieObject.id,
//                 title: movieObject.title,
//                 release_date: movieObject.release_date
//               },
//               ...docData.movies
//             }
//           };
//           db.collection("users")
//             .doc(`${user.uid}`)
//             .update(newDocData);
//         });
//     }
//   }
// }
