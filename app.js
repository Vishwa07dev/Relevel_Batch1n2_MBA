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
            name: "The Shawshank Redemption2",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency",
            cast: ["Tim Robbins", "Morgan Freeman"],
            director: "Frank Darabont",
            trailerUrls: ["https://www.imdb.com/video/vi3877612057/?playlistId=tt0111161&ref_=tt_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1994).toISOString()
        },
        {
            name: "The Shawshank Redemption3",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency",
            cast: ["Tim Robbins", "Morgan Freeman"],
            director: "Frank Darabont",
            trailerUrls: ["https://www.imdb.com/video/vi3877612057/?playlistId=tt0111161&ref_=tt_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1994).toISOString()
        },
        {
            name: "The Shawshank Redemption4",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency",
            cast: ["Tim Robbins", "Morgan Freeman"],
            director: "Frank Darabont",
            trailerUrls: ["https://www.imdb.com/video/vi3877612057/?playlistId=tt0111161&ref_=tt_ov_vi"],
            posterUrls: ["https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"],
            releaseDate: new Date(1994).toISOString()
        },{
            name: "The Shawshank Redemption5",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency",
            cast: ["Tim Robbins", "Morgan Freeman"],
            director: "Frank Darabont",
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