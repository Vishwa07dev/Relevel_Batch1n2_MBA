const express = require('express');
const mongoose = require('mongoose');
const { DB_URL } = require('./configs/dbConfig');
const { PORT } = require('./configs/serverConfig');
const Movie = require('./models/movie.model');
const theater = require('.models/theater.model');

const app = express();
app.use(express.json());


// database connection setup
mongoose.connect(DB_URL, async ()=>{
    console.log(`Application is connected to database: ${DB_URL}`);
    // create theater here
const theater1 = await theater.create({
 
    name : "Kapoor Theater",
    description : "this is hindi movie",
    city : "Lucknow UP",
    totalSeats : 970,
    pincode : 254687,
})

const theater2 = await theater.create({

    name : "Prithvi Theater",
    description : "this is hindi movie",
    city : "Kanpur UP",
    totalSeats : 1230,
    pincode : 235687,
})

const theater3 = await theater.create({

    name : "Prakash Theater",
    description : "this is hindi movie",
    city : "Fazabad UP",
    totalSeats : 2300,
    pincode : 235687,
})
const theater4 = await theater.create({

    name : "City Theater",
    description : "this is hindi movie",
    city : "Uttarakhand",
    totalSeats : 1400,
    pincode : 253687,
})
const theater5 = await theater.create({

    name : "Pallavi Theater",
    description : "this is hindi movie",
    city : "Noida UP",
    totalSeats : 2300,
    pincode : 258687,
})


    require("./routes/theater.route")(app);

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


require("./routes/movie.route")(app);



// express server setup
app.listen(PORT, ()=>{
    console.log(`Application is running on server: http://127.0.0.1:27017/${PORT}`);
})