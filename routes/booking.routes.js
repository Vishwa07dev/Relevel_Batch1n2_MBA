const bookingController = require("../controllers/booking.controller");
const {authTheatre} = require("../middlewares/index");
const {authMovie} = require("../middlewares/index");
const {authUser} = require("../middlewares/index");
const {authBooking} = require("../middlewares/index");

module.exports = (app) => {
    
    app.post("/mba/api/v1/bookings", [authUser.verifyToken, authBooking.checkTicketBookingRequiredFields, authTheatre.isMovieIncludesInTheatre], bookingController.bookMovieTicket);
    app.put("/mba/api/v1/bookings", [authUser.verifyToken, authBooking.isAdminOrBookingOwner], bookingController.updateBookings);
    app.get("/mba/api/v1/bookings/", [authUser.verifyToken], bookingController.listBookings);
    app.get("/mba/api/v1/bookings/:id", [authUser.verifyToken, authBooking.isValidBookingId], bookingController.getBookingDetails);

}