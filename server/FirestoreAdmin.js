const admin = require("firebase-admin");
const moment = require("moment");
const cron = require("node-cron");

const twilioFunctions = require("./twilioMessageFunctions");

admin.initializeApp({
  projectId: process.env.FIRESTORE_ADMIN_KEY_PROJECT_ID,
  private_key: process.env.FIRESTORE_ADMIN_KEY_PRIVATE_KEY.replace(
    /\\n/g,
    "\n"
  ),
  clientEmail: process.env.FIRESTORE_ADMIN_KEY_CLIENT_EMAIL
});

const adminDB = admin.firestore();

// Reference for all user documents
const usersRef = adminDB.collection("users");

async function getAllUsers() {
  let allUsers = [];
  await usersRef
    .get()
    .then(async snapshot => {
      // Do this for each user document:
      // 1. Create an empty "user" object
      // 2. Add an "id" key to the "user" object with the users id
      // 3. Get the user's movie watch list
      // 4. Get the users phone number
      // 5. Get the users SMS preferences (are they wanting to receive text updates?)
      //
      await Promise.all(
        snapshot.docs.map(async doc => {
          // for (const doc of snapshot.docs[0].data()) {
          const user = {};

          user.id = doc.id;

          // Users watch list (list of movies they want to see)
          const watchListRef = adminDB
            .collection("users")
            .doc(`${doc.id}`)
            .collection("watchList")
            .doc("movies");

          // Users metadata (info such as phone number)
          const userMetadataRef = adminDB
            .collection("users")
            .doc(`${doc.id}`)
            .collection("userInfo")
            .doc("metadata");

          // Users preferences (do they want SMS updates?)
          const userPrefRef = adminDB
            .collection("users")
            .doc(`${doc.id}`)
            .collection("userInfo")
            .doc("preferences");

          // Get the users SMS preferences. IF the user wants SMS updates, get their phone number and movie watch list.
          await userPrefRef.get().then(async data => {
            if (data.data().sendSmsReleaseReminders === true) {
              console.log(
                `The user ${doc.id} wants to recieve text reminders! 📳`
              );
              console.log("1");

              await watchListRef.get().then(data => {
                // const newData = data.data();
                // console.log(newData);
                console.log("2");
                user.movies = data.data().movies;
              });

              await userMetadataRef.get().then(data => {
                user.phone = data.data().phone;
                console.log("3");
              });

              await allUsers.push(user);
            } else {
              console.log(`The user ${doc.id} doesn't want reminders. 📵`);
            }
          });
        })
      );
      // console.log(allUsers);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  console.log("DONEEE!!");
  // Return an array with all the users that want text updates -- along with the movies they want reminders for.
  return allUsers;
}

const dayBeforeMovie = moment()
  .add(1, "day")
  .format("YYYY-MM-DD");

// Send text reminders every day at 12-noon;
cron.schedule("05 06 * * *", () => {
  getAllUsers().then(userData => {
    for (const user of userData) {
      // console.log("☎️");
      // console.log(user.phone);
      // console.log("🎥");
      const movies = Object.values(user.movies);
      movies.forEach(movie => {
        if (
          moment(movie.release_date).isSame(dayBeforeMovie) &&
          movie.textUpdates
        ) {
          twilioFunctions.sendMovieReminderSMS(user.phone, movie.title);
          console.log(`Reminded the user about ${movie.title} 🎥💪`);
        }
        // console.log(movie.release_date);

        // console.log(
        //   `The movie release date of ${movie.title} is: ${
        //     movie.release_date
        //   }. Tomorrow is: ${dayBeforeMovie}. Is this the same day? ${moment(
        //     movie.release_date
        //   ).isSame(dayBeforeMovie)}`
        // );
      });
      // for (let [key, value] of Object.entries(user.movies)) {
      //   console.log(key, value);
      // }
    }
  });
});

// var cronJob1 = new CronJob({
//   cronTime: "42 17 00 * * * ",
//   onTick: ,
//   start: true,
//   runOnInit: false
// });
