
const theatreController = require("../controllers/theatre.controller")
const { valReqBody } = require("../middleware");
/**
 * Defining the routes for the theatre resource
 */


module.exports = (app) => {
     //Fetching all the theatres
     /**
      * Supporting the following query params
      * mba/api/v1/theatres?city=<>
      * 
      * mba/api/v1/theatres?zip=<>
      * 
      */
     app.get("mba/api/v1/theatres" , theatreController.getAllTheatres);

     //Fetching theatre based on id
     app.get("mba/api/v1/theatres/:id", theatreController.getTheatre);

     //Create theatre
     app.post("mba/api/v1/theatres", [valReqBody.verifyRequestBody], theatreController.createTheatre);
  

     //Update theatre 
     app.put("mba/api/v1/theatres/:id", [valReqBody.verifyRequestBody], theatreController.updateTheatre);

     // Delete theatre
     app.get("mba/api/v1/theatres/:id", theatreController.deleteTheatre);

}