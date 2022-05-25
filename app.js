const express = require('express');
const mongoose = require('mongoose');
const { DB_URL } = require('./configs/dbConfig');
const { PORT } = require('./configs/serverConfig');
const Movie = require('./models/movie.model');
const Theatre = require('./model/theatre.model');

const app = express();
app.use(express.json());


// database connection setup
mongoose.connect(DB_URL, async ()=>{
    console.log(`Application is connected to database: ${DB_URL}`);
    
    // create movies here
    const movie1 = await Movie.create({
        name: "Puspa",
        description:"This is south indian movie.",
        cast:"Allu Arjun",
        director:"Puspraj",
        trailerUrls:"xyz123.com",
        posterUrls:"xyz123.in",
        releaseDate: "05-25-2022"
    })
    console.log(movie1);
    const movie2 = await Movie.create({
        name: "Puspa 2",
        description:"This is south indian movie.",
        cast:"Allu Arjun",
        director:"Puspraj",
        trailerUrls:"xyz123.com",
        posterUrls:"xyz123.in",
        releaseDate: "03-25-2022"
    })
    console.log(movie2);
    const movie3 = await Movie.create({
        name: "RRR",
        description:"This is south indian movie.",
        cast:"Allu Arjun",
        director:"Puspraj",
        trailerUrls:"xyz123.com",
        posterUrls:"xyz123.in",
        releaseDate: "02-25-2022"
    })
    console.log(movie3);
    const movie4 = await Movie.create({
        name: "SHAHO",
        description:"This is south indian movie.",
        cast:"Allu Arjun",
        director:"Puspraj",
        trailerUrls:"xyz123.com",
        posterUrls:"xyz123.in",
        releaseDate: "01-25-2022"
    })
    console.log(movie4);
    const movie5 = await Movie.create({
        name: "BEAST",
        description:"This is south indian movie.",
        cast:"Allu Arjun",
        director:"Puspraj",
        trailerUrls:"xyz123.com",
        posterUrls:"xyz123.in",
        releaseDate: "06-25-2022"
    })
    console.log(movie5);
})

const theater1 = await Theater.create({
    name: "PVR",
    description: "Ek bar dekho ",
    city: "Nashik ",
    pinCode: 422008,
    totalSeats: 50
})
console.log(theater1);


const theater2 = await Theater.create({
    name: "City center mall",
    description: "Movie dekh ke jana ",
    city: "Nashik",
    pinCode: 422009,
    totalSeats: 60
})
console.log(theater2);


const theater3 = await Theater.create({
    name: "Big movie ",
    description: "Best wala movie dekho",
    city: "Nashik",
    pinCode: 422010,
    totalSeats: 80
})
console.log(theater3);


const theater4 = await Theater.create({
    name: "Jay hind ",
    description: "best climax ",
    city: "Nashik",
    pinCode: 422012,
    totalSeats: 60
})
console.log(theater4);


const theater5 = await Theater.create({
    name: "sharmaji",
    description: "good vibes ",
    city: "Nashik",
    pinCode:422015,
    totalSeats: 65
})
    console.log(theater5);
}

require("./routes/movie.route")(app);
