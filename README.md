# Movie Tracker JS

Movie Tracker was designed as my final project for Threehouse's Full Stack JavaScript [Techdegree](https://join.teamtreehouse.com/techdegree/ "Treehouse Techdegree"). 

This project uses a handful of technologies, including but not limited to: 

![Movie Tracker Tech Stack](/README_Images/TechStack.png)

- React
- Firebase
- Twilio
- MongoDB
- Node/Express

Part of the project requirements were to use a minimum of *two APIs*. I decided to use APIs from [Twilio](https://www.twilio.com) (for sms messaging), and The [Movie Database (TMBd)] (https://www.themoviedb.org).

## About Movie Tracker:

I'm a huge fan of movies and the overall movie theater experience. And I wanted to create something I was passionate about and had an interest in. I see a lot a movies in theaters, and realized that at the end of each year I have a hard time remembering which movies I've seen. 

## Functionality

Movie Tracker has two primary pieces of functionality (with more to come). It will:

1. Allow you to keep track of the movies you've seen.
2. Send you SMS updates the day before movies you want to see are released in theaters. 

Here's an example of the *My Movies* section. Here you can see the movies you've seen, *and* the movies you want to see.
You can also enable text notifications from this screen. 

![Example of My Movies](/README_Images/ExampleScreenshot.png "Screenshot of My Movies section")

[Here's a LIVE DEMO](https://www.movietracker.dev)

If you'd like to run this on your local machine, you'll need to get API/access keys for these services:

-[TMDb](https://www.themoviedb.org/settings/api)
-[Twilio](https://www.twilio.com/try-twilio)
-[MongoDB](https://www.mongodb.com/cloud/atlas)
-[Firestore](https://www.mongodb.com/cloud/atlas)

After you've received keys for each of those services, place them in the ".env.example" file. 
Once you're ready to go, remove ".example" from the file name so it's ".env"

Run
```
npm install
```
and then
```
npm start
```


