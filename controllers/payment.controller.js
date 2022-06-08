const bcrypt = require("bcryptjs");
const Constants = require("../utils/constants");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const objectConverter = require("../utils/objectConverter");

exports.makePayment = async (req, res) => {

    const bookingId = req.body.bookingId;

    try {
        const bookingDetails = await Booking.findOne({_id: bookingId});

        const paymentObj = {
            bookingId: bookingId,
            amount: req.body.amount,
        }
        if(bookingDetails.status === Constants.bookingStatus.cancelled) {
            return res.status(200).send({message: "Payment cannot be done as booking has been cancelled"});
        }
        if(!isPaymentSuccess(bookingDetails)) {
            paymentObj.status = Constants.paymentStatus.failed;
            bookingDetails.status = Constants.bookingStatus.failed;
        } else {
            paymentObj.status = Constants.paymentStatus.success;
            bookingDetails.status = Constants.bookingStatus.completed;
        }
        
        const paymentSuccess = await Payment.create(paymentObj);
        await bookingDetails.save();

        return res.status(200).send(paymentSuccess);
    } catch(err) { 
        return res.status(500).send({
            message: "Some internal error while updating booking"
        });
    }

}

function isPaymentSuccess(bookingDetails) {

    const currentTime = new Date();

    const currentTimeInSeconds = currentTime.getTime() / 1000;

    const bookingTime = bookingDetails.createdAt;

    const bookingTimeInSeconds = bookingTime.getTime() / 1000;

    return ((bookingTimeInSeconds  + 60) < currentTimeInSeconds);
}

 const currentTime = new Date();

 const currentTimeInSeconds = currentTime.getTime() / 1000;

 console.log(currentTime, currentTimeInSeconds);