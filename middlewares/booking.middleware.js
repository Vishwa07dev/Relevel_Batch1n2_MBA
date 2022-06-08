const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Constants = require("../utils/constants");

checkTicketBookingRequiredFields =  (req, res, next) => {

/**
 *      Theater Id
 *     Movie Id
 *     DateTime
 *     No of tickets
*/

if(!req.body.theatreId) {
     return res.status(400).send({
            message: "Failed ! theatreId is not provided"
        });  
    }
if(!req.body.movieId) {
     return res.status(400).send({
            message: "Failed ! movieId is not provided"
        });  
    }
if(!req.body.dateTime) {
     return res.status(400).send({
            message: "Failed ! dateTime is not provided"
        });  
    }
if(!req.body.noOfTickets) {
     return res.status(400).send({
            message: "Failed ! noOfTickets is not provided"
        });  
    }
    next();
}
isValidBookingId = async (req, res, next) => {
    const user = await User.findOne({userId: req.userId});

    if(!(user.booking.includes(req.params.id))) {
        return res.status(403).send({message:"Invalid Booking Id"})
    }
    next();
}
isAdminOrBookingOwner = async (req, res, next) => {
    const user = await User.findOne({userId: req.userId});
    
    if(!(user.userType == Constants.userTypes.admin || user.userType == Constants.userTypes.customer)) {
        return res.status(403).send({message: "Either owner or admin is allowed to do this operation"});
    }
}
const authBooking = {
  checkTicketBookingRequiredFields: checkTicketBookingRequiredFields,
  isValidBookingId: isValidBookingId,
  isAdminOrBookingOwner: isAdminOrBookingOwner
};

module.exports = authBooking;
