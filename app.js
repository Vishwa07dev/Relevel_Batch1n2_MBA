const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const Movie = require("./models/movie.model");
const Theatre = require("./models/theatre.model");
const constants = require("./utils/constants");

const hostname = '127.0.0.1';
console.clear();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function logger(req, res, next) {
    return res.status(400).send({
        message: "System is under maintenance"
    });
}

function requestTime(req, res, next) {
    console.log("Request Time", new Date().toLocaleDateString(), new Date().toLocaleTimeString(), "IST");
    next();
}

app.use(requestTime);
// app.use(logger);
require("./routes")(app);

mongoose.connect(dbConfig.DB_URL, async () => {
    console.log(`Connecting to MongoDB...`);
    console.log(`Connection Successful`);
    // movieInit();
    // theatreInit();
});

async function  theatreInit() {
    await Theatre.collection.drop();

    const theatre1 = await Theatre.create({
       name: "Theatre1",
       description: "located in LA",
       city: "Los Angeles",
       pinCode : 90001,
       totalSeats: 250
    });
    const theatre2 = await Theatre.create({
       name: "Theatre2",
       description: "located in Bay Area",
       city: "San Francisco",
       pinCode : 95125,
       totalSeats: 250
    });
    const theatre3 = await Theatre.create({
       name: "Theatre3",
       description: "located in Mountain View",
       city: "Mountain View",
       pinCode : 94039,
       totalSeats: 250
    });
    const theatre4 = await Theatre.create({
       name: "Theatre4",
       description: "located in Sunnyvale",
       city: "Sunnyvale",
       pinCode : 94043,
       totalSeats: 200
    });
    const theatre5 = await Theatre.create({
       name: "Theatre5",
       description: "located in cupertino",
       city: "cupertino",
       pinCode : 94024,
       totalSeats: 250
    });

    console.log("Theatres created");

    console.log(theatre1, theatre2, theatre3, theatre4, theatre5);
}
async function movieInit() {

    await Movie.collection.drop();

    const movie1 = await Movie.create({
        name: "Top Gun: Maverick",
        description: "After more than 30 years of service as one of the Navy's top aviators, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: ["yt.be/topgunmaverick"],
        posterUrls: "tom.cruise/topgunmaverick",
        language: constants.languages.english,
        releaseDate: "2022-02-24",
        releaseStatus: constants.releaseStatus.unreleased
    });
    const movie2 = await Movie.create({
        name: "Top Gun: Maverick",
        description: "After more than 30 years of service as one of the Navy's top aviators, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: ["yt.be/topgunmaverick"],
        posterUrls: "tom.cruise/topgunmaverick",
        language: constants.languages.english,
        releaseDate: "2022-02-24",
        releaseStatus: constants.releaseStatus.unreleased
    });
    const movie3 = await Movie.create({
        name: "Mission: Impossible – Dead Reckoning Part 1",
        description: "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: ["yt.be/topgunmaverick"],
        posterUrls: "tom.cruise/topgunmaverick",
        language: constants.languages.english,
        releaseDate: "2022-02-24",
        releaseStatus: constants.releaseStatus.unreleased
    });
    const movie4 = await Movie.create({
        name: "Mission: Impossible – Dead Reckoning Part 2",
        description: "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: ["yt.be/topgunmaverick"],
        posterUrls: "tom.cruise/topgunmaverick",
        language: constants.languages.english,
        releaseDate: "2022-02-24",
        releaseStatus: constants.releaseStatus.unreleased
    });
    const movie5 = await Movie.create({
        name: "Mission: Impossible – Dead Reckoning Part 3",
        description: "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written and directed by Christopher McQuarrie. It will be the seventh and penultimate installment of the Mission: Impossible film series",
        cast: ["Tom Cruise", "Jennifer Connelly", "Glen Powell"],
        director: "Joseph Kosinski",
        trailerUrls: ["yt.be/topgunmaverick"],
        posterUrls: "tom.cruise/topgunmaverick",
        language: constants.languages.english,
        releaseDate: "2022-02-24",
        releaseStatus: constants.releaseStatus.unreleased
    });

    console.log("Movies created");

    console.log("MOVIE 1", movie1);
    console.log("MOVIE 2", movie2);
    console.log("MOVIE 3", movie3);
    console.log("MOVIE 4", movie4);
    console.log("MOVIE 5", movie5);
  
}

app.listen(serverConfig.PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${serverConfig.PORT}/`);
});