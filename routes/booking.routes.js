const bookingController = require("../controllers/booking.controller")
const { authJwt, verifyBooking } = require("../middlewares");


module.exports = (app)=>{

    /**
     * Create the routes for the corresponding controllers
     */
    // CREATE CALL
    app.post("/mba/api/v1/bookings", [authJwt.verifyToken, verifyBooking.verifyInitiateBooking],  bookingController.initiateBooking);

    // UPDATE CALL
    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken, verifyBooking.isAdminOrOwnerOfBooking], movieController.updateMovie);

    // GET SINGLE CALL
    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken, verifyBooking.isAdminOrOwnerOfBooking], bookingController.getOneMovie);

    app.get("/mba/api/v1/bookings", [authJwt.verifyToken, verifyBooking.isAdminOrOwnerOfBooking],  bookingController.getAllMovies);
}

