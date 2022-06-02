/**
 * this file will contain the custom middleware for  verifying the request  body
 */

 const User  = require("../models/user.model");
 const constants = require('../utils/constants')
 
 validateSignupRequest = async (req, res, next) =>{

    // validate if username exists
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! User name is not provided"
        })
    }
    
    
    //validate if the userId exists
     if(!req.body.userId ){
        return res.status(400).send({
            message: "Failed! UserId is not provided"
        })
    }
 
     /**
      * validate if the userId is already not present
      */
 
     const user = await User.findOne({
         userId: req.body.userId 
     });
 
     if(user != null){
         return res.status(400).send({
             message: "Failed! UserId already exists"
         })
     }
 
 /**
  * validation for
  * email
  * password
  * userType
  */
 
 
    //validate if email exists
 
    if(!req.body.email){
     return res.status(400).send({
         message: "Failed! Email is not provided"
     })
    }
 
    //validate if the email is already present
 
    const email = await User.findOne({ 
        email : req.body.email
     });
 
     if(email != null){
         return res.status(400).send({
             message: "Failed! Email already exists"
         })
     }    
 
     //validate if the password exists
 
     if(!req.body.password){
         return res.status(400).send({
             message: "Failed! Password not provided"
         })
     }
 
     /**
      * validate if the password is a String or not and the length is 8 or more 
      */
 
     if(typeof req.body.password  !== "string" && req.body.password.length < 8){
         return res.status(400).send({
             message: "Password is less than 8 or not a String"
         })
     }
 
 
     // validate if  the usertype exists
 
     if(!req.body.userTypes){
         return res.status(400).send({
             message : "Usertype is not provided"
         })
     }
 
     /**
      * validate if the userType is among the "customer", "engineer", or "Admin"
      */
 
     if(req.body.userTypes !== constants.userTypes.admin ||
         req.body.userTypes !== constants.userTypes.customer ||
         req.body.userTypes !== constants.userTypes.theatre_owner ){
             return res.status(400).send({
                 message : "Enter a valid usertype"
             })
     }
 
    
 
     //..................................//
      next(); //give the control to the controller
 } 
 
 
 //export the verify Signup to index.js
 
 module.exports = {
     
     validateSignUpRequest : validateSignupRequest
 }