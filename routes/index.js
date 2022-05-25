const movieRoutes = require('./movie.route');
const theaterRoutes = require('./theatre.routes');


module.exports = (app) =>{
    movieRoutes(app);
    theaterRoutes(app);

}