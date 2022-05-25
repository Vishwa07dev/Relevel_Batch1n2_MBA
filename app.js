const express = require('express');
const mongoose = require('mongoose');
const { DB_URL } = require('./configs/dbConfig');
const { PORT } = require('./configs/serverConfig');
const Movie = require('./models/movie.model');
const Theatre = require('./models/theatre.model');

const app = express();
app.use(express.json());


// database connection setup
mongoose.connect(DB_URL, async () => {
    console.log(`Application is connected to database: ${DB_URL}`);

    // create movies here
    const movie1 = await Movie.create({
        name: "Puspa",
        description: "This is south indian movie.",
        cast: "Allu Arjun",
        director: "Puspraj",
        trailerUrls: "xyz123.com",
        posterUrls: "xyz123.in",
        releaseDate: "05-25-2022"
    })
    console.log(movie1);
    const movie2 = await Movie.create({
        name: "Puspa 2",
        description: "This is south indian movie.",
        cast: "Allu Arjun",
        director: "Puspraj",
        trailerUrls: "xyz123.com",
        posterUrls: "xyz123.in",
        releaseDate: "03-25-2022"
    })
    console.log(movie2);
    const movie3 = await Movie.create({
        name: "RRR",
        description: "This is south indian movie.",
        cast: "Allu Arjun",
        director: "Puspraj",
        trailerUrls: "xyz123.com",
        posterUrls: "xyz123.in",
        releaseDate: "02-25-2022"
    })
    console.log(movie3);
    const movie4 = await Movie.create({
        name: "SHAHO",
        description: "This is south indian movie.",
        cast: "Allu Arjun",
        director: "Puspraj",
        trailerUrls: "xyz123.com",
        posterUrls: "xyz123.in",
        releaseDate: "01-25-2022"
    })
    console.log(movie4);
    const movie5 = await Movie.create({
        name: "BEAST",
        description: "This is south indian movie.",
        cast: "Allu Arjun",
        director: "Puspraj",
        trailerUrls: "xyz123.com",
        posterUrls: "xyz123.in",
        releaseDate: "06-25-2022"
    })
    console.log(movie5);

    //------------------------------##theatre-------------------------------//
    const theatre1 = await Theatre.create({
        name: "PVR",
        description: "Worlds largest theatre network",
        city: "Mumbai",
        pinCode: 227806,
        totalSeats: 120
    })
    console.log(theatre1);

    const theatre2 = await Theatre.create({
        name: "INOX",
        description: "India's largest theatre network",
        city: "Mumbai",
        pinCode: 227806,
        totalSeats: 120
    })
    console.log(theatre2);

    const theatre3 = await Theatre.create({
        name: "PVR Dubai",
        description: "Worlds largest theatre network",
        city: "Abu Dhabi",
        pinCode: 227806,
        totalSeats: 120
    })
    console.log(theatre3);

    const theatre4 = await Theatre.create({
        name: "Reliance",
        description: "Worlds largest theatre network",
        city: "Mumbai",
        pinCode: 227806,
        totalSeats: 120
    })
    console.log(theatre4);

    const theatre5 = await Theatre.create({
        name: "Cineworld",
        description: "Worlds largest theatre network",
        city: "Mumbai",
        pinCode: 227806,
        totalSeats: 238
    })
    console.log(theatre5);
})


require("./routes/movie.route")(app);



// express server setup
app.listen(PORT, () => {
    console.log(`Application is running on server: http://localhost/${PORT}`);
})