import React, { useState, useEffect } from "react";
import moment from "moment";

// Takes in a movie prop (that's an object) and iterates over it. While filtering out adult movies.

function useFetchMovies(
  typeOfMovies,
  setQuery,
  query = null,
  userMovies = null,
  loginStatus
) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovieData = async () => {
    // Need to clean up this code and figure out if there's a better way to handle the logic. Here's what it's currently doing:
    // 1. If the typeOfMovies argument is equal to "search", set the dataToFetch to the TMDB query API.
    // 2. Else if the above is not true set it to the TMDB movie search endpoint.
    // 3. If the query argument does NOT equals an empty string, try and fetch any data from the API. Also fetch the data if the
    //    typeOfMovie is equal to "popular" or "upcoming"

    const movieDatabaseEndpoint = navBarLocation => {
      const date = moment();

      if (navBarLocation === "upcoming") {
        return `/api/upcoming`;
        // return `https://api.themoviedb.org/3/discover/movie?api_key=d951026be8c262501cf4a37f22f82184&page=1&language=en-US&primary_release_date.gte=${date.format(
        //   "YYYY-MM-DD"
        // )}&sort_by=primary_release_date.asc&with_release_type=3&include_video=false&region=US`;
      }

      if (navBarLocation === "trending") {
        return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_OMDB_API_KEY}&language=en-US&media_type=movie&page=1&primary_release_year=2019&sort_by=popularity.desc&vote_count&region=US`;
      }

      if (navBarLocation === "search") {
        return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_OMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
      }
    };

    const dataToFetch = movieDatabaseEndpoint(typeOfMovies);
    if (typeOfMovies === "trending" || typeOfMovies === "upcoming") {
      setQuery("");
      try {
        setLoading(true);
        const res = await fetch(dataToFetch);
        const movies = await res.json();
        console.log(movies);

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
      // setMovieData(userMovies);
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
  }, [typeOfMovies, query, loginStatus]);

  return [movieData, setMovieData];
}

export { useFetchMovies };
