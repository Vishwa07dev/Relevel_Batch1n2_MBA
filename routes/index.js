const movieRoutes = require("./movie.route");
const theaterRoutes = require(".theater.routes");

module.exports = (app) =>{
    movieRoutes(app);
    theaterRoutes(app); 


}