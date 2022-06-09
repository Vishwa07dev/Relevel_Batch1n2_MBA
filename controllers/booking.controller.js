const Constants = require("../utils/constants");
const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");
const Booking = require("../models/booking.model");
const Movie = require("../models/movie.model");
const objectConverter = require("../utils/objectConverter");



/**
 *   theatreId
 *     movieId
 *     userId ( ref )
 *     timing
 *     status ( IN_PROGRESS | COMPLETED | CANCELLED | FAILED) 
 *     noOfSeats
 *     totalCost
 *     createdAt
 *     updatedAt
 * 
 * 
 *     Theater Id
 *     Movie Id
 *     DateTime
 *     No of tickets
 */


exports.bookMovieTicket = async (req, res) => {

    try {
        const user = await User.findOne({userId: req.userId});

        const bookingObj = {
            userId: user._id,
            theatreId: req.body.theatreId,
            movieId: req.body.movieId,
            timing: req.body.timing,
            noOfSeats: req.body.noOfSeats
        }
        
        const theatre = await Theatre.findOne({
            _id: req.body.theatreId
        });

        bookingObj.totalCost = ticketObj.noOfSeats * theatre.ticketPrice;

        const ticketBooked = await Booking.create(ticketObj);

        user.bookingIds.push(ticketBooked._id);

        await user.save();

        return res.status(201).send(objectConverter.ticketBookingObj(ticketBooked)); 

    } catch (err) {
     console.error("Error while booking ticket/s", err.message);
        res.status(500).send({
            message: "Internal server error while booking ticket/s"
    });
  }

}
exports.getBookingDetails = async (req, res) => {
    
    try {
    const bookingDetails = await Booking.find({_id: req.params.bookingId});

    return res.status(200).send(bookingDetails);
    } catch(err) {
        return res.status(500).send({
            message: "Some internal error while getting bookings"
        });
    }
};

exports.listBookings = async (req, res) => { 
    const queryObj = {};

    if(req.query.status) {
        if(req.query.status == Constants.bookingStatus.inProgress) {
            queryObj.status = Constants.bookingStatus.inProgress
        }
        else if(req.query.status == Constants.bookingStatus.cancelled) {
            queryObj.status = Constants.bookingStatus.cancelled
        }
        else if(req.query.status == Constants.bookingStatus.completed) {
            queryObj.status = Constants.bookingStatus.completed
        }
        else if(req.query.status == Constants.bookingStatus.failed) {
            queryObj.status = Constants.bookingStatus.failed
        }
     }   
        
    try {
        const user = await User.findOne({userId: req.userId});

        if(user.userType == Constants.userTypes.admin) {
        }
        else if(user.userType == Constants.userTypes.customer) {
            queryObj.userId = {
            $in: user._id
            }
        }
     
        const bookings = await Booking.find(queryObj);
        res.status(200).send(objectConverter.bookingListResponse(bookings));
    }
    catch(err) {
        return res.status(500).send({
            message: "Some internal error while getting bookings"
        });
    }
};

exports.updateBookings = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.bookingId
        });

        const theatre = await Theatre.findOne({
            _id: booking.theatreId
        });

        if(req.body.status.cancel) {
            booking.status = Constants.bookingStatus.cancelled;
        }
        if(req.body.noOfSeats) {
            booking.totalCost = req.body.noOfSeats * theatre.ticketPrice;
        }
        
        if(req.body.movieId) {

            const movie = await Movie.findOne({ movieId: booking.movieId });
            if(!movie) {
                return res.status(403).send({message: "Invalid Movie"})
                }
              if(!isMovieExistsInTheatre(req.body.movieId, booking.theatreId)) {
               return res.status(401).send({message: "Movie is unable in the theatre right now."});  
                }
                booking.movieId = req.body.movieId;
         }
        if(req.body.theatreId) {
            const theatre = await Theatre.findOne({ movieId: booking.movieId });
            if(!theatre) {
                return res.status(403).send({message: "Invalid Theatre"})
            }
            if(!isMovieExistsInTheatre(booking.movieId, req.body.theatreId, )) {
               return res.status(401).send({message: "Movie is unable in the theatre right now."});  
                }
                booking.theatreId = req.body.theatreId;
         }
        await booking.save();
        return res.status(201).send(objectConverter.ticketBookingObj(booking)); 
    } catch(err) {
        return res.status(500).send({
            message: "Some internal error while updating booking"
        });
    }
}


async function isMovieExistsInTheatre(movieId, theatreId) {
    
    const theatre = await Theatre.findOne({ _id: theatreId });

    return (theatre.movies.includes(movieId));
}

