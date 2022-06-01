 
const Users = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");



/**
 *! Update the user - status, userTypes
 *?  - only -ADMIN should be allowed to do this
 */

 exports.updateUser = async (req, res) => {
     /**
      * ! One of the ways of updating
      */
     if(!req.params.id) {
            return res.status(500).send({
            message: "User Id not provided"
        });
     }

     try {

         const user = await Users.findOne({userId: req.userId});


        user.name = (req.body.name != undefined) ? req.body.name : user.name;
        user.email = (req.body.email != undefined) ? req.body.email : user.email;

         await user.save();
         return res.status(200).send({
             message: "User record successfully updated"
         });
     } catch (err) {
         console.log(err.message);
         res.status(500).send({
            message: "Internal server error while updating user record"
         });
     }
 }

 exports.updatePassword = (req, res) => {
     
        if(!req.body.newPassword) {
            return res.status(500).send({
            message: "newPassword not provided"
        });
     }
     const userId = req.userId;
      try {
         const user = Users.findOneAndUpdate({
             userId: userId
         }, {
             password: req.body.newPassword
         }).exec();
         
         res.status(200).send({
             message: "Password successfully updated"
         });
     } catch (err) {
         console.log(err.message);
         res.status(500).send({
            message: "Internal server error while updating password"
         });
     }
 }