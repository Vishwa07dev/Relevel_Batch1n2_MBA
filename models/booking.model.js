
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const bookingSchema = new mongoose.Schema ({
    
    theatreId : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "Theatre"
    },
    movieId : {
        type : [mongoose.SchemaType.ObjectId],
        ref  : "Movie" 
    },
    userId : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "User"
    },
showtime : {
    type : Date,
    required : true
},
bookingStatus : {
    type : String,
    required : true,
    default : constants.bookingStatus.in_progress,
    enum: [constants.bookingStatus.in_progress, constants.bookingStatus.complete, constants.bookingStatus.canceled, constants.bookingStatus.failed];
},
noOfSeats : {
    type : Number,
    required : true,
},
totalCost : {
    type : String,
    required : true
},
createAt : {
    type : Date,
    immutable : true,
    default :  () =>{
        return Date.now();
    }
},
updatedAt : {
    type : Date,
    default : () => {
        return  Date.now();
    }
}


})


// theatreId
// *     movieId
// *     userId ( ref )
// *     timing
// *     status ( IN_PROGRESS | COMPLETED | CANCELLED | FAILED) 
// *     noOfSeats
// *     totalCost
// *     createdAt
// *     updatedAt
