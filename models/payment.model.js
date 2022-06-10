const mongoose = require("mongoose");
const Constants = require("../utils/constants");

const paymentSchema = new mongoose.Schema({
    
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Booking',
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: Constants.paymentStatus.inProgress,
        enum : [Constants.paymentStatus.inProgress, Constants.paymentStatus.success, Constants.paymentStatus.failed]
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


module.exports = mongoose.model("Payment", paymentSchema);