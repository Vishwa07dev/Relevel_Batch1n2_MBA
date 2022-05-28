const movieController = require("../controllers/movie.controller");
const { movieValidation } = require("../middlewares");



module.exports = (app)=>{
    app.get("/mba/api/v1/movies", movieController.getAllMovies);

    /**
     * Create the routes for the corresponding controllers
     */
    // CREATE CALL
    app.post("/mba/api/v1/movies", [movieValidation.validateMovieDetails], movieController.addMovie);

    app.get("/mba/api/v1/movies/:id", movieController.getOneMovie);

    app.get("/mba/api/v1/movies", movieController.getAllMovies);
    
    app.put("/mba/api/v1/movies/:id", [movieValidation.validateMovieDetails], movieController.updateMovie);
 
    app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);
     
    
  
}

