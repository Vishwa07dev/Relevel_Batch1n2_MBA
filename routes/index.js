
const movieRoutes = require('./movie.route')
const theatreRoutes = require('./theatre.routes')
const authRoutes = require('./auth.routes');
const userRoutes = require('./userRoutes');

module.exports = (app)=>{
    movieRoutes(app);
    theatreRoutes(app);
    authRoutes(app);
    userRoutes(app);
}