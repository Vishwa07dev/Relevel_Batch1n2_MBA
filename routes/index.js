
const movieRoutes = require("./movie.routes");
const theatreRoutes = require("./theatre.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");


module.exports = (app) => {
    movieRoutes(app),
    theatreRoutes(app),
    authRoutes(app),
    userRoutes(app)
}