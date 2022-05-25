
const movieRoutes = require('./movie.route')
const theatreRoutes = require('./theatre.routes')

module.exports = (app)=>{
    movieRoutes(app);
    theatreRoutes(app);
}