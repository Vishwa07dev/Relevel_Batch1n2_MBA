const mongoose = require('mongoose');
const constants = require('../utils/constants')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    userId :{
        type : String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    email :{
        type:String,
        required:  true,
        lowercase:true,
        minlength:10,
        unique:true
    },
    age : {
        type : Number,
        required : true,
        minlength : 3
    },
    createdAt:{
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type: Date,
        default: ()=>{
            return Date.now();
        }
    },
    userType : {
        type:String,
        required:true,
        default: constants.userType.customer,
        enum : [constants.userType.admin,constants.userType.customer,constants.userType.theatreOwner]
    }
});

module.exports = mongoose.model('Users',userSchema)