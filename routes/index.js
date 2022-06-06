
const movieRoutes = require("./movie.routes");
const theatreRoutes = require("./theatre.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const bookingRoutes = require("./booking.routes");


module.exports = (app) => {
    movieRoutes(app),
    theatreRoutes(app),
    authRoutes(app),
    userRoutes(app),
    bookingRoutes(app)
}