import React, { useState } from "react";
import uniqBy from "lodash.uniqby";

import dotenv from 'dotenv'
dotenv.config()

const LoadMoreMovies = props => {
  // const [pageNum, setPageNum] = useState(2);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(2);
  const {
    movieGrid,
    setMovieGrid,
    navBarLocation,
    pageNum,
    setPageNum
  } = props;

  async function loadMore() {
    //Where should the page number state be held? In the local component or in the highest parent component? Don't want to prop drill too much.
    console.log(`the page num is: ${pageNum}`);

    try {
      setLoading(true);

      function endpointToFetch() {
        if (navBarLocation === "trending") {
          return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_OMDB_API_KEY}&language=en-US&media_type=movie&page=${pageNum}&primary_release_year=2019&sort_by=popularity.desc&vote_count`;
        } else if (navBarLocation === "upcoming") {
          return `/api/upcoming/${pageNum}`;
        }
      }

      const res = await fetch(endpointToFetch());

      const movies = await res.json();
      // console.log(movies.rdsesults);
      const newlyFetchedMovies = await uniqBy(
        [...movieGrid, ...movies.results],
        "id"
      );

      setTotalPages(movies.total_pages);

      setLoading(false);

      if (loading === false) {
        setMovieGrid(newlyFetchedMovies);
      }

      //start at page 2, advance to next page
      setPageNum(pageNum + 1);
    } catch (err) {
      console.log(err);
    }
  }

  if (pageNum <= totalPages) {
    return (
      <div className="load-more-movies-div">
        <button onClick={loadMore} className="load-more-movies-button">
          {loading ? "LOADING..." : "LOAD MORE"}
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default LoadMoreMovies;
