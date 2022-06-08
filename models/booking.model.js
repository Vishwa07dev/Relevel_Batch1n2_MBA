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
        type: String,
        required: true
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
     Status: {
        type: String,
        enum: [constants.bookingStatus.cancelled, constants.bookingStatus.completed, constants.bookingStatus.failed, constants.bookingStatus.inProgress],
        default: constants.bookingStatus.inProgress
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