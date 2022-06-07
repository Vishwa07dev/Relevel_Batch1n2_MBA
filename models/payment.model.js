const mongoose = require("mongoose");
const constants = require("../utils/constants");




const paymentSchema = new mongoose.Schema({

    bookingId : {
        type : [mongoose.SchemaType.ObjectId],
        ref  : "Booking"
    },
    amount : {
        type : Number,
        required : true
    },
    paymentStatus : {
        type : String,
        required : true,
        default : constants.paymentStatus.in_progress,
        enum    : [constants.paymentStatus.success, constants.paymentStatus.in_progress, constants.paymentStatus.success];
    },
    createAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : () => {
            return Date.now();
        }
    }


})


//  Payment Model :
//  *     bookingId ( ref )
//  *     amount
//  *     status ( IN_PROGRESS | FAILED | SUCCESS )
//  *     createdAt
//  *     updatedAt
//  * 