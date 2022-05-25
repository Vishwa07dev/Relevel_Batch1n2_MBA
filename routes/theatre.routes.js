const theatreController = require("../controllers/theatre.controller");
const {theatreCheckPoint} = require("../middlewares/index");



module.exports = (app) => {
    
    app.post("/mba/api/v1/theatres", theatreController.createTheatre);
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", [theatreCheckPoint.isValidTheatre], theatreController.getTheatre);
    app.put("/mba/api/v1/theatres/:id", [theatreCheckPoint.isValidTheatre], theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id", [theatreCheckPoint.isValidTheatre], theatreController.deleteTheatre);
}