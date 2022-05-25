const theaterController = require("../controllers/theater.controller")

module.exports = (app)=>{

    
    app.post("/mba/api/v1/theaters",  theaterController.addTheater);

    app.get("/mba/api/v1/theaters", theaterController.getAllTheaters);  
   
    app.get("/mba/api/v1/theaters/:id", theaterController.getOneTheater);
    
    app.put("/mba/api/v1/theaters/:id", theaterController.updateTheater); 

    app.delete("/mba/api/v1/theaters/:id", theaterController.deleteTheater);
     
    

    
}