const movieController = require("../controllers/movie.controller")



module.exports = (app)=>{
    app.get("/mba/api/v1/movies", movieController.getAllMovies);

    /**
     * Create the routes for the corresponding controllers
     */
    // CREATE CALL
    app.post("/mba/api/v1/movies",  movieController.addMovie);

    // UPDATE CALL
    app.put("/mba/api/v1/movies/:id", movieController.updateMovie);
 
    // DELETE CALL
    app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);
     
    // GET SINGLE CALL
    app.get("/mba/api/v1/movies/:id", movieController.getOneMovie);
}

module.exports = (app) => {

    app.get("/mba/api/v1/movies", theaterController.getAllMovies);

    /**
     * Create the routes for the corresponding controllers
     */
    // CREATE CALL
    app.post("/mba/api/v1/theatrs",  theatrController.addMovie);

    // UPDATE CALL
    app.put("/mba/api/v1/theatrs/:id", theatrController.updateMovie);
 
    // DELETE CALL
    app.delete("/mba/api/v1/theatrs/:id", theatrController.deleteMovie);
     
    // GET SINGLE CALL
    app.get("/mba/api/v1/theatrs/:id", theatrController.getOneMovie);


}
