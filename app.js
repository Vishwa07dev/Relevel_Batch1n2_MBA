const express = require("express");
const mongoose = require("mongoose");
const { DB_URL } = require("./configs/dbConfig");
const { PORT } = require("./configs/serverConfig");
const Movie = require("./models/movie.model");
const Theatre = require("./models/theatre.model");

const app = express();
app.use(express.json());

// database connection setup
mongoose.connect(DB_URL, async () => {
  console.log(`Application is connected to database: ${DB_URL}`);

  await Movie.collection.drop();
  await Theatre.collection.drop();

  try {
    // create movies here
    const movie1 = await Movie.create({
      name: "Puspa",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "05-25-2022",
    });
    console.log(movie1);
    const movie2 = await Movie.create({
      name: "Puspa 2",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "03-25-2022",
    });
    console.log(movie2);
    const movie3 = await Movie.create({
      name: "RRR",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "02-25-2022",
    });
    console.log(movie3);
    const movie4 = await Movie.create({
      name: "SHAHO",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "01-25-2022",
    });
    console.log(movie4);
    const movie5 = await Movie.create({
      name: "BEAST",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "06-25-2022",
    });
    console.log(movie5);
  } catch (err) {
    console.log(err.message);
  }

  try {
    //theater
    const theatre1 = await Theatre.create({
      name: "PVR",
      description: "nice place to watch movies",
      city: "Pune",
      pinCode: 411028,
      totalSeats: 100,
    });
    console.log(theatre1);

    const theatre2 = await Theatre.create({
      name: "INOX",
      description: "corner seat available",
      city: "Pune",
      pinCode: 411033,
      totalSeats: 100,
    });
    console.log(theatre2);

    const theatre3 = await Theatre.create({
      name: "Vaibhav Theatre",
      description: "nice place to watch movies",
      city: "Pune",
      pinCode: 411022,
      totalSeats: 100,
    });
    console.log(theatre3);

    const theatre4 = await Theatre.create({
      name: "cinepolis",
      description: "nice place to watch movies",
      city: "Pune",
      pinCode: 411133,
      totalSeats: 100,
    });
    console.log(theatre4);

    const theatre5 = await Theatre.create({
      name: "PVR",
      description: "nice place to watch movies",
      city: "Pune",
      pinCode: 411123,
      totalSeats: 100,
    });
    console.log(theatre5);
  } catch (err) {
    console.log(err.message);
  }
});

require("./routes/movie.route")(app);

// express server setup
app.listen(PORT, () => {
  console.log(
    `Application is running on server: http://127.0.0.1:27017/${8081}`
  );
});
