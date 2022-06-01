const authMovie = require("./movie.middleware");
const authTheatre = require("./theatre.middleware");
const authUser = require("./auth.middleware");

module.exports = {
    authMovie,
    authTheatre,
    authUser
}
