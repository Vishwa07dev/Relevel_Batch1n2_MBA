const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const Movie = require("./models/movie.model");



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(dbConfig.DB_URL, async () => {
    console.log(`Connecting to MongoDB...`);
    console.log(`Connection Successful`);
    init();
});


async function init() {

    await Movie.collection.drop();

    const movie1 = await Movie.create({
        name: "Top Gun: Maverick",
        description: "After more than 30 years of service as one of the Navy's top aviators, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: "yt.be/topgunmaverick",
        posterUrls: "tom.cruise/topgunmaverick",
        language: "English",
        releaseDate: "2022-02-24"

    });
    const movie2 = await Movie.create({
        name: "Top Gun: Maverick",
        description: "After more than 30 years of service as one of the Navy's top aviators, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: "yt.be/topgunmaverick",
        posterUrls: "tom.cruise/topgunmaverick",
        language: "English",
        releaseDate: "2022-02-24"

    });
    const movie3 = await Movie.create({
        name: "Mission: Impossible – Dead Reckoning Part 1",
        description: "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: "yt.be/topgunmaverick",
        posterUrls: "tom.cruise/topgunmaverick",
        language: "English",
        releaseDate: "2023-02-24"

    });
    const movie4 = await Movie.create({
        name: "Mission: Impossible – Dead Reckoning Part 2",
        description: "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: "yt.be/topgunmaverick",
        posterUrls: "tom.cruise/topgunmaverick",
        language: "English",
        releaseDate: "2024-02-24"
    });
    const movie5 = await Movie.create({
        name: "Mission: Impossible – Dead Reckoning Part 3",
        description: "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: "yt.be/topgunmaverick",
        posterUrls: "tom.cruise/topgunmaverick",
        language: "English",
        releaseDate: "2025-02-24"
    });

    console.log("Movies created");

    console.log("MOVIE 1", movie1);
    console.log("MOVIE 2", movie2);
    console.log("MOVIE 3", movie3);
    console.log("MOVIE 4", movie4);
    console.log("MOVIE 5", movie5);
    
}
app.listen(serverConfig.PORT, () => {
    console.log(`Get Fit App listening on port ${serverConfig.PORT}`);
});