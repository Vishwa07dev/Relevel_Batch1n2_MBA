const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name : {
    type : String,
    required : true
},
userId : {
    type : String,
    required : true,
    unique : true
},
password : {
    type : String,
    required : true
},
age : {
    type : Number,
    required : true
},
userType : {
    type : String, // ADMIN,THEATREOWNER,CUSTOMER
   required : true,
   default : "CUSTOMER",      //constants.userType.customer
   enum : [constants.userTypes.customer, constants.userTypes.admin, constants.userTypes.theatreOwner]
},
userStatus : {
    type : String,
    required : true,
    default : "APPROVED",
    enum : [constants.userStatus.approved, constants.userStatus.pending]

},
email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    uppercase : true,
    minlength : 10
},
mobile : {
    type : number,
    required : true
},
address : {
    type : String,
    required : true
},
createAt : {
    type : Date,
    immutable : true,
    default :  () => {
        return Date.now();
    }
},
updatedAt : {
    type : Date,
    default : () => {
        return Date.now();
    }
},

})
module.exports = mongoose.model("User", userSchema);