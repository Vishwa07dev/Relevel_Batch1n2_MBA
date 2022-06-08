/**
 * This file will contain the logic for booking controller
 */
const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

exports.makePayment = async (req, res) => {
    try {
        const booking = await Movie.findOne({
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


         return res.status(201).send(payment);
 
     } catch (err) {
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
}
