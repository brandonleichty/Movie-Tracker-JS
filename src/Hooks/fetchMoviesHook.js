import React, { useState, useEffect } from "react";

// Takes in a movie prop (that's an object) and iterates over it. While filtering out adult movies.

function useFetchMovies(typeOfMovies) {
  const [movieData, setMovieData] = useState([]);

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

  const movieEndpointURL = `https://api.themoviedb.org/3/movie/${typeOfMovies}?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&page=1&region=US`;

  const fetchMovieData = async () => {
    try {
      const res = await fetch(movieEndpointURL);
      const movies = await res.json();
      setMovieData(movies.results);
      console.log(movies.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [typeOfMovies]);

  return [movieData, setMovieData];
}

export { useFetchMovies };
