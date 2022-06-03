const user = require('../models/user.model')
const mongoose = require("mongoose");

const NewAndOldPassword = async (req, res, next) => {
    try {
        //get new and old password
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        //checking if the old password is equal to new passord
        if(oldPassword == newPassword){
            return res.status(400).send({
                message : "The new password is same as old password"
            })
        }

        //checking if both old and new passowrd is present
        if(!oldPassword || !newPassword){
            return res.status(400).send({
                message : "Please fill all the fields"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};



const verifyTheatre = {
    NewAndOldPassword : NewAndOldPassword
};
module.exports = verifyTheatre;
