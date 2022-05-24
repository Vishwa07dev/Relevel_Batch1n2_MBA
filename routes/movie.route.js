const movieController = require("../controllers/movie.controller")



module.exports = (app)=>{
    app.get("/mba/api/v1/movies", movieController.getAllMovies);

    /**
     * Create the routes for the corresponding controllers
     */
    app.get("/mba/api/v1/movies/:id", movieController.getMovie);

    app.post("/mba/api/v1/movie/", [verifyMovieReqBody.validateMovieRequestBody], movieController.createMovie);

    app.put("/mba/api/v1/movies/:id", [verifyMovieReqBody.validateMovieRequestBody], movieController.updateMovie);

    app.delete("/mba/api/v1/movies/:id", moviesController.deleteMovie);
}

