
const movieRoutes = require("./movie.routes");
const theatreRoutes = require("./theatre.routes");


module.exports = (app) => {
    movieRoutes(app),
    theatreRoutes(app)
}