const mongoose = require("mongoose");

/**
 *  The Schema Payment resource stored 
 */

const paymentSchema = new mongoose.Schema({

    bookingId:{
        typr: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    amount:{
        type: Number,
        reuired: true
    },
    status:{
        type: String,
        reuired: true,
        default: "FAILED"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () =>{
            return Date.now();
        }
    },
    updatedAt:{
        type: Date,
        default: () =>{
            return Date.now();
        }
    }
})

module.exports = mongoose.moedel("Payment, paymentSchema");