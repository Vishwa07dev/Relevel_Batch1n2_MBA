const theatreController = require("../controllers/theatre.controller");
const {theatreCheckPoint} = require("../middlewares/index");
const {movieCheckPoint} = require("../middlewares/index");


module.exports = (app) => {

    app.post("/mba/api/v1/theatres", theatreController.createTheatre);
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", [theatreCheckPoint.isValidTheatre], theatreController.getTheatre);
    app.put("/mba/api/v1/theatres/:id", [theatreCheckPoint.isValidTheatre], theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id", [theatreCheckPoint.isValidTheatre], theatreController.deleteTheatre);

    // Add/Remove movies inside a theatre
    app.put("/mba/api/v1/theatres/:theatreId/movies/", [theatreCheckPoint.isValidTheatre, movieCheckPoint.isValidMovies], theatreController.addOrRemoveMoviesInsideTheatre);

    // app.delete("/mba/api/v1/theatres/:theatreId/movies/:movieId", [theatreCheckPoint.checkParams, theatreCheckPoint.isValidTheatre, theatreCheckPoint.isMovieIncludesInTheatre], theatreController.deleteMovieFromTheatre);

    //Get all the movies from a theatre
    app.get("/mba/api/v1/theatres/:theatreId/movies/", [theatreCheckPoint.isValidTheatre], theatreController.getAllMoviesFromTheatre);

    //Get a specific movie inside a theatre
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId", [theatreCheckPoint.checkParams, theatreCheckPoint.isValidTheatre, theatreCheckPoint.isMovieIncludesInTheatre], theatreController.getMovieFromTheatre);
    
}