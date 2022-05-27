const movieRoute = require("./movie.route");
const theaterRoute = require("./theater.route");



module.exports = (app) => {
    movieRoute(app),
    theaterRoute(app);
}