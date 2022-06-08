const constants = require('../utils/constants');
const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Booking"
    },
    amount: {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : constants.paymentStatus.inProgress,
        enum : [constants.paymentStatus.failed,constants.paymentStatus.success,constants.paymentStatus.inProgress]
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

module.exports = mongoose.model("Payment", paymentSchema);