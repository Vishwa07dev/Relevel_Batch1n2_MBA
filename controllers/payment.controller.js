/**
 * This file will contain the logic for booking controller
 */
const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const constants = require("../utils/constants");
const notificationServiceClient = require("../utils/notificationServiceClient");
const User = require("../models/user.model");

exports.makePayment = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.body.bookingId
        });

        const paymentObj = {
            bookingId: req.body.bookingId,
            amount: req.body.amount,
            status: constants.paymentStatus.success // Since we are not using any payment api, setting status by default as SUCCESS
         }

        const payment = await Payment.create(paymentObj);

        booking.status = constants.bookingStatus.completed;
        await booking.save();

// ===================Notification service ============================//
         const user = await User.findOne({_id: booking.userId})
        notificationServiceClient.sendEmail(booking._id, "New movie booked: "+booking._id, [booking.showTime, booking.totalCost], user.email, booking.theatreId);



//======================================================================//
         return res.status(201).send(payment);
 
     } catch (err) {
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
}
