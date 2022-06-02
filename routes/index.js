
const movieRoutes = require('./movie.route')
const theatreRoutes = require('./theatre.routes')
const authRoutes = require('./auth.routes')

module.exports = (app)=>{
    movieRoutes(app);
    theatreRoutes(app);
}