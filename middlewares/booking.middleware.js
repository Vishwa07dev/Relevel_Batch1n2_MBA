const mongoose = require("mongoose");
const theatre = require("../models/theatre.model");
const movie = require("../models/movie.model");
const user = require("../models/user.model");
const booking = require("../models/booking.model");
const constants = require("../utils/constants");
const { verify } = require("jsonwebtoken");


const isValidBookingId = async (req, res, next){

try {

    if(!mongoose.Types.ObjectId.isvalid(req.params.id)) {
        return res.status(400).send ({
            message: "Booking Id is not valid"
        })
    }

    const booking =  await Booking.findOne ({
        _id: req.params.id
    });

    if(!booking) {
        return res.status(400).send({
            message: "Booking id does not exist"
        })
    }

    next();

} catch (err) {
    console.log(err.message);
    return res.status(500).send({
        message: "Some internal error"
    })
}
}


const verifyAddBooking = async (req, res, next) => {

try {
     const theatre =  await Theatre.findOne ({
  _id: req.params.theatreId

     });

     if(!theatre) {
         return res.status(400).send ({
             message: " TheatreId is not valid"
         })
     }

const movieAvailable = await Theatre.findOne( {
 _id: req.params.id,

 movie: {
     $in: req.body.movieId
 }
});

if(!movieAvailable){
    return res.status(400).send ({
        message: "Movie is not available in given theatre"
    })
}

 next();
} catch (err) {
    constants.log(err.message);
    return res.status(500).send ({
        message: "Some internal Error" + err.message
    })
}

}

const isAdminOrOwnerOfBooking = async (req, res, next) =>{

    try {

        // fatch user from DB using the userid
        const user = await User.findOne ({
            userId: req.userId
        });

        // check if admin or User is Valid Owner
        if(user.userType != constants.userType.admin){
            if(booking.userId != user.userId){
                return res.status(400).send ({
                    message: "Only allowed the booking ADMIN/OWNER has access to this operation"
                })
            }
        }

        next();  
    } catch (err) {
        console.log(err.message);
        return res.status(500).send ({
            message: "Some internal error" + err.message
        })
    }
};

const verifyBooking = {
    isValidBookingId: isValidBookingId,
    verifyAddBooking: verifyAddBooking,
    isAdminOrOwnerOfBooking: isAdminOrOwnerOfBooking
}

module.exports = verifyBooking
