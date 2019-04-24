import React, { useState, useEffect } from "react";

// Takes in a movie prop (that's an object) and iterates over it. While filtering out adult movies.

function useFetchMovies(
  typeOfMovies,
  setQuery,
  query = null,
  userMovies = null
) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  // This function returns a string value which is the TMDB endpoint for either "popular" or "upcoming" movies.
  // A few things to look into:
  // 1. Is there a better way to do this than using to IF statements inside a function?
  // 2. How will this work with a a search endpoint?

  // const movieEndpointURL = () => {
  //   if (typeOfMovies === "upcoming") {
  //     return "https://api.themoviedb.org/3/movie/upcoming?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&page=1&region=US";
  //   } else if (typeOfMovies === "popular") {
  //     return "https://api.themoviedb.org/3/movie/popular?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&page=1&region=US";
  //   }
  // };

  const movieEndpointURL = `https://api.themoviedb.org/3/movie/${typeOfMovies}?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&media_type=movie&page=1&primary_release_year=2019&sort_by=popularity.desc&vote_count&region=US`;

  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&query=${query}&page=1&include_adult=false`;

  const fetchMovieData = async () => {
    // Need to clean up this code and figure out if there's a better way to handle the logic. Here's what it's currently doing:
    // 1. If the typeOfMovies argument is equal to "search", set the dataToFetch to the TMDB query API.
    // 2. Else if the above is not true set it to the TMDB movie search endpoint.
    // 3. If the query argument does NOT equals an empty string, try and fetch any data from the API. Also fetch the data if the
    //    typeOfMovie is equal to "popular" or "upcoming"

    const dataToFetch =
      typeOfMovies === "search" ? searchURL : movieEndpointURL;
    if (typeOfMovies === "popular" || typeOfMovies === "upcoming") {
      setQuery("");
      try {
        setLoading(true);
        const res = await fetch(dataToFetch);
        const movies = await res.json();

        setLoading(false);

        //This returns an array of movie objects. Need to look into if this is the bestion. Maybe use just objects without the array?
        if (loading === false) {
          setMovieData(movies.results);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (typeOfMovies === "myMovies") {
      setQuery("");
      setMovieData(userMovies);
    }

    if (typeOfMovies === "search") {
      if (typeof query === "undefined" || query === "" || query === null) {
        setMovieData([]);
      } else {
        try {
          setLoading(true);
          const res = await fetch(dataToFetch);
          const movies = await res.json();

          setLoading(false);

          //This returns an array of movie objects. Need to look into if this is the bestion. Maybe use just objects without the array?
          if (loading === false) {
            setMovieData(movies.results);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [typeOfMovies, query]);

  return [movieData, setMovieData];
}

export { useFetchMovies };
