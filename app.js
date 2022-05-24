const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const Movie = require("./models/movie.model");
const serverConfig = require("./configs/server.config");
const constants = require("./utils/constants");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require("./routes")(app);

/**
 * Setup the mongodb connection and create on ADMIN user
 */
mongoose.connect(dbConfig.DB_URL, async () => {
    console.log("MongoDB connected");

    await Movie.collection.drop();// Since this a dev setup

    const movieSeedData = [
        {
            name: "The Shawshank Redemption1",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency",
            cast: ["Tim Robbins", "Morgan Freeman"],
            director: "Frank Darabont",
            trailerUrls: ["https://www.imdb.com/video/vi3877612057/?playlistId=tt0111161&ref_=tt_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1994).toISOString()
        },
        {
            name: "The Godfather",
            description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
            cast: ["Marlon Brando", "Al Pacino"],
            director: "Francis Ford Coppola ",
            trailerUrls: ["https://www.imdb.com/video/vi1348706585/?playlistId=tt0068646&ref_=tt_pr_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1972).toISOString()
        },
        {
            name: "The Dark Knight",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            cast: ["Christian Bale", "Heath Ledger"],
            director: "Christopher Nolan",
            trailerUrls: ["https://www.imdb.com/video/vi3877612057/?playlistId=tt0111161&ref_=tt_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1994).toISOString()
        },
        {
            name: "The Lord of the Rings: The Return of the King (2003)",
            description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
            cast: ["Elijah Wood", "Viggo Mortensen"],
            director: "Peter Jackson",
            trailerUrls: ["https://www.imdb.com/video/vi3877612057/?playlistId=tt0111161&ref_=tt_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1994).toISOString()
        },{
            name: "Schindler's List",
            description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
            cast: ["Liam Neeson", "Ralph Fiennes"],
            director: "Steven Spielberg",
            trailerUrls: ["https://www.imdb.com/video/vi3877612057/?playlistId=tt0111161&ref_=tt_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1994).toISOString()
        }
    ];

    // create movie documents
    for(let movie of movieSeedData){
        await Movie.create(movie);
    }

    console.log("Movie data created");
})

/**
 * Start the express server
 */
app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})