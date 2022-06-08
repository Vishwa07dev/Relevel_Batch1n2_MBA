 const constants = require('../utils/constants');
 const mongoose = require('mongoose');
 
 
 const bookingSchema = new mongoose.Schema({
     theatreId: {
         type: mongoose.SchemaTypes.ObjectId,
         ref : "Theatre"
     },
     movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Movie"
     },
     userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "User"
     },
     showTime: {
        type: Date,
        required: true
     },
     noOfSeats: {
         type: Number,
         required: true
     },
     totalCost: {
        type: Number,
        required: true
     },
     status: {
        type: String,
        enum: [constants.movieStatus.cancelled, constants.movieStatus.completed, constants.movieStatus.failed, constants.movieStatus.inProgress],
        default: constants.movieStatus.inProgress
     },
     createdAt: {
         type: Date,
         default: () => {
             return Date.now();
         },
         immutable: true
     },
     updatedAt: {
         type: Date,
         default: () => {
             return Date.now();
         }
     } 
 })
 
 module.exports = mongoose.model("Booking", bookingSchema);