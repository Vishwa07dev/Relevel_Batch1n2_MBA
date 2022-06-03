const authRoutes = require('./auth.route');
const movieRoutes = require('./movie.route');
const theatreRoutes = require('./theatre.routes');
const userRoutes = require('./user.route');

module.exports = (app) => {
    movieRoutes(app);
    theatreRoutes(app);
    authRoutes(app);
    userRoutes(app);
}