const client = require("twilio")(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
require("dotenv").config();

exports.sendMovieReminderSMS = function(phone, movie) {
  // Maybe add this functionallity later
  // const firstName = userName
  //   .split(" ")
  //   .slice(0, -1)
  //   .join(" ");

  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
      body: `Hey! you wanted to see "${movie}." Good news — It comes out tomorrow! 🍿`
    })
    .then(() => {
      console.log(`The user was reminded about ${movie}!`);
    })
    .catch(err => {
      console.log(`There was an error: ${err}`);
    });
};
