const mongoose = require("mongoose");
const Constants = require("../utils/constants");

const bookingSchema = new mongoose.Schema({
    
    theatreId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Theatre"
    },
    movieId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Movie"
    },
    userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
    },
    timing: {
        type: Date,
        required: true
    },
    status: {
         type: String,
         required: true,
         default: Constants.bookingStatus.inProgress,
         enum : [Constants.bookingStatus.inProgress, Constants.bookingStatus.completed, Constants.bookingStatus.cancelled, Constants.bookingStatus.failed],
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => { 
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});


module.exports = mongoose.model("BookingSchema", bookingSchema);
