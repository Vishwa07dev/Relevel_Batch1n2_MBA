const movieController = require("../controllers/movie.controller");
const {authTheatre} = require("../middlewares/index");
const {authMovie} = require("../middlewares/index");
const {authUser} = require("../middlewares/index");



module.exports = (app) => {
    
    app.post("/mba/api/v1/movies",[authUser.verifyToken, authUser.isAdmin, authTheatre.checkFields], movieController.createMovie);
    app.get("/mba/api/v1/movies", movieController.getAllMovies);
    app.get("/mba/api/v1/movies/:id", [authMovie.isValidMovie], movieController.getMovie);
    app.put("/mba/api/v1/movies/:id", [authUser.verifyToken, authUser.isAdmin, authMovie.isValidMovie], movieController.updateMovie);
    app.delete("/mba/api/v1/movies/:id", [authUser.verifyToken, authUser.isAdmin, authMovie.isValidMovie], movieController.deleteMovie);
}