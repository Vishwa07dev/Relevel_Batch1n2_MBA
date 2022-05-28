const theaterController = require("../controllers/theater.controller");
const { theaterValidation } = require("../middlewares");

module.exports = (app)=>{

    
    app.post("/mba/api/v1/theaters", [theaterValidation.validateTheater], theaterController.addTheater);

    app.get("/mba/api/v1/theaters", theaterController.getAllTheaters);  
   
    app.get("/mba/api/v1/theaters/:id", theaterController.getOneTheater);
    
    app.put("/mba/api/v1/theaters/:id", [theaterValidation.validateTheater],theaterController.updateTheater); 

    app.delete("/mba/api/v1/theaters/:id", theaterController.deleteTheater);

    app.put("/mba/api/v1/theatres/:id/movies",[], theaterController.addMoviesInTheater);

    //app.get("/mba/api/v1/theatres/:id/movies",[], theaterController.getAllMoviesInTheater);
     
    
     
    

    
}