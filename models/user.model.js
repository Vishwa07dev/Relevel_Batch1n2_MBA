/**
 * This file will contain the attributes for USer resources
 */

const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({

    /**
     * name, user_id, password, email, createdAt, updatedAt 
     * usertype [Theatre_owner|admin|customer]
     */
     name: {
        type: String,
        require : true
    },

    userId : {
        type: String,
        unique: true,
        require : true
    },

    password: {
        type: String,
        require : true
    },

    email : {
        type: String,
        require : true,
        lowercase : true,
        minlength : 10,
        unique : true
    },

    createdAt : {
        type : Date,
        immutable : true,
        default : () =>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now();
        }
    },
    userType : {
        type: String,
        require : true,
        default : constants.userTypes.customer,
        enum : [constants.userTypes.customer, constants.userTypes.theatre_owner, constants.userTypes.admin]
    }

});


module.exports = mongoose.model("User", userSchema);
