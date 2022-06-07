const bookingController = require("../controllers/booking.controller");
const { authJwt, verifyBooking } = require("../middlewares");

module.exports = (app) => {
  // create call
  app.post(
    "/mba/api/v1/bookings",
    [authJwt.verifyToken, verifyBooking.verifyAddBooking],
    bookingController.addBooking
  );

  // update call by id
  app.put(
    "/mba/api/v1/bookings/:id",
    [authJwt.verifyToken, verifyBooking.isAdminOrOwnerOfBooking],
    bookingController.updateBooking
  );

  // get single call
  app.get(
    "/mba/api/v1/bookings/:id",
    [authJwt.verifyToken, verifyBooking.isAdminOrOwnerOfBooking],
    bookingController.getOneBooking
  );

  // get all
  app.get(
    "/mba/api/v1/bookings",
    [authJwt.verifyToken, verifyBooking.isAdminOrOwnerOfBooking],
    bookingController.getAllBookings
  );
};
