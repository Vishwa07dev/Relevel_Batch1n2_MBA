const movieController = require("../controllers/movie.controller");
const {theatreCheckPoint} = require("../middlewares/index");
const {movieCheckPoint} = require("../middlewares/index");



module.exports = (app) => {
    
    app.post("/mba/api/v1/movies",[theatreCheckPoint.checkFields], movieController.createMovie);
    app.get("/mba/api/v1/movies", movieController.getAllMovies);
    app.get("/mba/api/v1/movies/:id", [movieCheckPoint.isValidMovie], movieController.getMovie);
    app.put("/mba/api/v1/movies/:id", [movieCheckPoint.isValidMovie], movieController.updateMovie);
    app.delete("/mba/api/v1/movies/:id", [movieCheckPoint.isValidMovie], movieController.deleteMovie);
}