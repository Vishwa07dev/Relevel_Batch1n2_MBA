/**
 * This file will contain the logic for payment
 */
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const Payment = require("../models/payment.model")
const constants = require("../utils/constants");
const read = require("body-parser/lib/read");


exports.makePayment = async (req, res) => {

    //fetching the booking based on the id provided
    const booking = await Booking.findOne({_id : req.body.bookingId});

    //checking if its valid booking id
    if(!booking){
        return res.status(404).send({
            message : "Invalid booking id"
        })
    }

    if(booking.bookingStatus != constants.bookingStatus.inProgress){
        return res.status(400).send({
            message : "booking is expired or completed"
        })
    }
    //storing the obj to be stored in database
    const paymenReqBody = {
        bookingId : req.body.bookingId,
        amount : req.body.amount
    }

    try{
        //making the payment
        var payment = await Payment.create(paymenReqBody);

        //updating the payment status
        payment.paymentStatus = constants.paymentStatus.success;
        await payment.save();
        //updating the booking status
        booking.bookingStatus = constants.bookingStatus.completed;
        await booking.save();
        return res.status(200).send(payment);
    }catch(err){
        
        //updating the payment status
        payment.paymentStatus = constants.paymentStatus.success;
        await payment.save();
        //updating the booking status
        booking.bookingStatus = constants.bookingStatus.completed;
        await booking.save();

        return res.status(500).send({
            message : "internal error"
        })
    }
}

