const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({

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
        type: Number
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

module.exports = mongoose.model("Theater", theaterSchema);