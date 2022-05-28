const express = require('express');
const mongoose = require('mongoose');
const { DB_URL } = require('./configs/dbConfig');
const { PORT } = require('./configs/serverConfig');
const Movie = require('./models/movie.model');

const Theater = require('./models/theater.model')

const app = express();
app.use(express.json());


// database connection setup
mongoose.connect(DB_URL, async ()=>{
    console.log(`Application is connected to database: ${DB_URL}`);
    
try{
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
  }catch(err){
       console.log(err.message);
   }
    
    //await Movie.collection.drop();
    

    
  
   
    try{
      const theater1 = await Theater.create({
        name: "PVR",
        description: "xyz",
        city: "mumbai",
        pinCode: 01,
        totalSeats: 50
      })
      console.log(theater1)
        
    const theater2 = await Theater.create({
        name: "Plaza",
        description: "xyzs",
        city: "puna",
        pinCode: 023,
        totalSeats: 60
    })
    console.log(theater2);

    
    const theater3 = await Theater.create({
        name: "kokila",
        description: "xyzd",
        city: "delhi",
        pinCode: 30,
        totalSeats: 40
    })
    console.log(theater3);

    
    const theater4 = await Theater.create({
        name: "PCR",
        description: "xyzdfd",
        city: "banglore",
        pinCode: 010,
        totalSeats: 60
    })
    console.log(theater4);

    
    const theater5 = await Theater.create({
        name: "prozone",
        description: "xyzfs",
        city: "aurangabad",
        pinCode: 20,
        totalSeats: 45
    })

    console.log(theater5);

   }catch(err){
       console.log(err.message);
   }

})

require("./routes/movie.route")(app);
require("./routes/theater.route")(app);

// express server setup
app.listen(PORT, ()=>{
    console.log(`Application is running on server: http://localhost/${PORT}`);
});