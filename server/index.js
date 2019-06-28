require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const moment = require("moment");
const mongoose = require("mongoose");
const compression = require("compression");
const pino = require("express-pino-logger")();
const sortBy = require("lodash.sortby");
const uniqBy = require("lodash.uniqby");
const differenceBy = require("lodash.differenceby");
const morgan = require("morgan");
const path = require("path");

require("./FirestoreAdmin");

// fireStoreAdmin.getAllUsers();

const client = require("twilio")(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Define schema
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  vote_count: Number,
  id: Number,
  video: Boolean,
  vote_average: Number,
  title: String,
  popularity: Number,
  poster_path: String,
  original_language: String,
  original_title: String,
  genre_ids: [Number],
  backdrop_path: String,
  adult: Boolean,
  overview: String,
  release_date: String
});

// Compile model from schema
const MovieModel = mongoose.model("upcomingmovies", MovieSchema);

const app = express();
const dev = app.get("env") !== "production";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

if (!dev) {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));

  app.use(express.static(path.resolve(__dirname, "../build")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  // });
}

async function getUpcomingMovies() {
  const CURRENT_DATE = moment().add(1, "day");
  const SEVEN_MONTHS_FROM_CURRENT_DATE = moment().add(7, "months");

  const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${
    process.env.OMDB_API_KEY
  }&page=1&language=en-US&primary_release_date.gte=${CURRENT_DATE.format(
    "YYYY-MM-DD"
  )}&primary_release_date.lte=${SEVEN_MONTHS_FROM_CURRENT_DATE.format(
    "YYYY-MM-DD"
  )}&with_release_type=2|3&include_video=false&region=US`;

  // const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=d951026be8c262501cf4a37f22f82184&page=1&language=en-US&release_date.gte=2019-06-02&release_date.lte=2019-08-01&with_release_type=2|3&include_video=false&region=US
  // `;

  const res = await fetch(endPoint);
  const movies = await res.json();
  const totalPages = movies.total_pages;
  // console.log(totalPages);
  // console.log(movies);

  async function fetchAndCombineMovies() {
    let totalUpcomingMovies = [];

    for (let i = 1; i <= totalPages; i++) {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.OMDB_API_KEY
        }&page=1&language=en-US&primary_release_date.gte=${CURRENT_DATE.format(
          "YYYY-MM-DD"
        )}&primary_release_date.lte=${SEVEN_MONTHS_FROM_CURRENT_DATE.format(
          "YYYY-MM-DD"
        )}&with_release_type=2|3&include_video=false&region=US&page=${i}`
      );

      const upcomingMovies = await res.json();

      totalUpcomingMovies = await uniqBy(
        [...totalUpcomingMovies, ...upcomingMovies.results],
        "id"
      );
      // console.log(`Page ${i} of ${totalPages}`);
    }
    // console.log(totalUpcomingMovies);
    return totalUpcomingMovies;
  }

  const unsortedTotalMovies = await fetchAndCombineMovies();

  const sortedMovies = sortBy(unsortedTotalMovies, "release_date");

  return sortedMovies;
}

let totalDocs = null;

app.post("/api/messages", (req, res) => {
  res.header("Content-Type", "application/json");

  const fullName = req.body.name;
  const firstName = fullName
    .split(" ")
    .slice(0, -1)
    .join(" ");
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: `Hey ${firstName}, you've ENABLED Movie Tracker reminders! We'll send you a reminder one day before the movie you want to see is released in theaters.`
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.get("/api/upcoming/:page?", async (req, res) => {
  const moviesPerPage = 20;
  const pageNumber = req.params.page || 1;
  const movies = await MovieModel.find({})
    .sort({ release_date: "asc" })
    .skip(moviesPerPage * pageNumber - moviesPerPage)
    .limit(moviesPerPage)
    .exec();

  const totalPages = Math.ceil(totalDocs / moviesPerPage);
  console.log(`There are ${totalPages} pages!`);
  res.send(JSON.stringify({ results: movies, total_pages: totalPages }));
});

app.listen(3001, async () => {
  console.log("Express server is running on localhost:3001");
  const movieResults = await getUpcomingMovies();
  const movies = movieResults.filter(movie => movie.poster_path != null);
  console.log("Upcoming movies have been retrieved.");

  //-----------------------------MONGODB SETUP AREA -----------------------------

  //Set up default mongoose connection
  var mongoDB = process.env.MONGODB_CLUSTER;
  mongoose.connect(mongoDB, { useNewUrlParser: true });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", async function(err, resp) {
    const today = moment().format("YYYY-MM-DD");
    console.log("Successfully connected to your MongoDB cluster! 🙌");

    await MovieModel.deleteMany({ release_date: { $lte: today } });

    const currentMovies = await MovieModel.find();
    const diffMovies = differenceBy(movies, currentMovies, "id");
    console.log(diffMovies);
    console.log(`Wrote ${diffMovies.length} movies to the DB.`);

    await MovieModel.insertMany(diffMovies).then(docs => {
      console.log("SUCCESSFULLY INSERRTED DOCUMENTS");
    });

    totalDocs = await MovieModel.countDocuments((err, count) => {
      console.log(`There are ${count} documents in your DB!`);
    });
  });
});
