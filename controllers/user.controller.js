/**
 * This file will contain the logic for user 
 * 
 */

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.updatePassword = async (req, res) => {
    
    const user = User.findOne({userId : req.userId });

    if(!req.body.password){
        return res.status(400).send({
            message : "new password not provided!"
        })
    }

    user.password = bcrypt.hashSync(req.body.password,8);
    user.save();
    return res.status(200).send({
        message : "password succesfully changed!"
    });

}


exports.updateUser = async (req, res) => {
    
    try{

        const user = User.findOne({userId : req.userId });


        user.name = req.body.name ?req.body.name : user.name;
        user.userType = req.body.userType ? req.body.userType :user.userType;
        user.email = req.body.email ? req.body.email : user.email;




    const updatedUser  = user.save();
    return res.status(200).send({updatedUser});
   


}catch(err){
    console.log(err.message);
    return res.status(500).send({
        message: "Some internal error"
    })
}

}