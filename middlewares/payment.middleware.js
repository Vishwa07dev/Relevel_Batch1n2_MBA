const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const verifyBookingId = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.body.bookingId)) {
            return res.status(400).send({
                message: "Booking Id Id is not valid"
            })
        }

        const booking = await Booking.findOne({
            _id: req.body.bookingId
        });

        if (!booking) {
            return res.status(400).send({
                message: "Booking Id doesn't exist"
            })
        }

        if(booking.status == constants.bookingStatus.cancelled){
            return res.status(400).send({
                message: "This Booking already cancelled"
            })
        }else if(booking.status == constants.bookingStatus.completed){
            return res.status(400).send({
                message: "This Booking already completed"
            })
        }else if(booking.status == constants.bookingStatus.failed){
            return res.status(400).send({
                message: "This Booking already failed"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyPayment = {
    verifyBookingId: verifyBookingId
};
module.exports = verifyPayment;
