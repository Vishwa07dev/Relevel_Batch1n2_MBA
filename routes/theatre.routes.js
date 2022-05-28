
const theatreController = require("../controllers/theatre.controller")
const {verifyTheatre} = require("../middlewares");

/**
 * Defining the routes for the theatre resource
 */


module.exports = (app) => {
     //Fetching all the theatres
     /**
      * Supporting the following query params
      * mba/api/v1/theatres?city=<>
      * 
      * mba/api/v1/theatres?pinCode=<>
      * 
      */
     app.get("/mba/api/v1/theatres" , theatreController.getAllTheatres);

     //Fetching theatre based on id
     app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);

     //Create theatre
     app.post("/mba/api/v1/theatres", [verifyTheatre.verifyAddTheatre], theatreController.createTheatre);

     //Update theatre 
     app.put("/mba/api/v1/theatres/:id", [verifyTheatre.isValidTheatreId], theatreController.updateTheatre);

     // Delete theatre
     app.delete("/mba/api/v1/theatres/:id", [verifyTheatre.isValidTheatreId], theatreController.deleteTheatre);
     

     //Add/Remove  movies inside a theatre
     app.put("/mba/api/v1/theatres/:id/movies", [verifyTheatre.isValidTheatreId,verifyTheatre.isValidMovies],theatreController.addMoviesToATheatres);

     //Get all the movies inside a theatre
     app.get("/mba/api/v1/theatres/:id/movies",[verifyTheatre.isValidTheatreId,verifyTheatre.isValidMovies], theatreController.getMoviesInsideATheatre);
    
     //Get a specific movie inside a theatre
     app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",[verifyTheatre.isValidTheatreId,verifyTheatre.isValidMovies], theatreController.getMoviesInsideATheatreBasedOnId);
     

     /**
      * Log the time of every request in console .. Add a middleware before the routes
      */
}

