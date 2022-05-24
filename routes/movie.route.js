

const { getAllMovies, getMovieDetails, updateMovie, deleteMovie, createMovie } = require("../controllers/movie.controller");



module.exports = (app)=>{
    app.get("/mba/api/v1/movies", getAllMovies);

    /**
     * Create the routes for the corresponding controllers
     */
     app.get("/mba/api/v1/movies/:id", getMovieDetails);
    
     app.put("/mba/api/v1/movies/:id", updateMovie);

     app.delete("/mba/api/v1/movies/:id", deleteMovie);

     app.post("/mba/api/v1/movies", createMovie);
}

