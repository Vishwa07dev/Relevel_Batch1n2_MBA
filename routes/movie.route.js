const movieController = require("../controllers/movie.controller")



module.exports = (app)=>{
    app.get("/mba/api/v1/movies", movieController.getAllMovies);

    /**
     * Create the routes for the corresponding controllers
     */
}

