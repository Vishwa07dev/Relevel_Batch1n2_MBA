const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
     createdAt: {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now();
        },
    },
    updatedAt: {
        type : Date,
        default : () => {
            return Date.now();
        }
    }

});

module.exports = mongoose.model("Theatre", theatreSchema);