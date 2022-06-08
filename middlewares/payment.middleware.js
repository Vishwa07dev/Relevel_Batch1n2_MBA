const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");

isValidBookingDetails = async (req, res, next) => {

    if(!req.body.bookingId) {
        return res.status(400).send({message: "Booking id is required in order to makePayment"});
    }
    if(!req.body.amount) {
        return res.status(400).send({message: "Booking id is required in order to makePayment"});
    }

    const userId = req.userId;

    const user = await User.findOne({userId: userId});

    if(!(user.booking.includes(req.params.id))) {
        return res.status(403).send({message:"Invalid Booking Id"})
    }

    const bookingDetails = await Booking.findOne({_id:req.body.bookingId});

   if(bookingDetails.totalCost != req.body.amount) {
        return res.status(403).send({message:"Invalid amount"});
   }

   next();

}


const authPayment = {
isValidBookingDetails: isValidBookingDetails
};

module.exports = authPayment;
