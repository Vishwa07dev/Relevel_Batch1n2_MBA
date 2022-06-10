const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    
    theatreOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
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
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movie"
    },  
    ticketPrice: {
        type:Number,
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