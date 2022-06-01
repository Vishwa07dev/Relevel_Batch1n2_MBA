const theatreController = require("../controllers/theatre.controller");
const {authTheatre} = require("../middlewares/index");
const {authMovie} = require("../middlewares/index");
const {authUser} = require("../middlewares/index");


module.exports = (app) => {

    app.post("/mba/api/v1/theatres", [authUser.verifyToken, authUser.isAdmin], theatreController.createTheatre);
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", [authTheatre.isValidTheatre], theatreController.getTheatre);
    app.put("/mba/api/v1/theatres/:id", [authUser.verifyToken, authUser.isAdminOrTheatreOwner, authTheatre.isValidTheatre], theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id", [authUser.verifyToken, authUser.isAdminOrTheatreOwner, authTheatre.isValidTheatre], theatreController.deleteTheatre);

    // Add/Remove movies inside a theatre
    app.put("/mba/api/v1/theatres/:theatreId/movies/", [authUser.verifyToken, authUser.isAdminOrTheatreOwner, authTheatre.isValidTheatre, authMovie.isValidMovies], theatreController.addOrRemoveMoviesInsideTheatre);

    // app.delete("/mba/api/v1/theatres/:theatreId/movies/:movieId", [theatreCheckPoint.checkParams, theatreCheckPoint.isValidTheatre, theatreCheckPoint.isMovieIncludesInTheatre], theatreController.deleteMovieFromTheatre);

    //Get all the movies from a theatre
    app.get("/mba/api/v1/theatres/:theatreId/movies/", [authTheatre.isValidTheatre], theatreController.getAllMoviesFromTheatre);

    //Get a specific movie inside a theatre
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId", [authTheatre.checkParams, authTheatre.isValidTheatre, authTheatre.isMovieIncludesInTheatre], theatreController.getMovieFromTheatre);
    
}