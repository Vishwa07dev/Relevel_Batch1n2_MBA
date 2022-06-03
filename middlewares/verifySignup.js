// this file will custom middleware for verifying the requesat body

const user = require('../models/user.model')
const constant = require('../utils/constants')

validateSignupRequest = async (req,res,next) => {

    //validate username 
    if(!req.body.name){
        return res.status(400).send({
            message : "failed ! Name is not provided"
        })
    }

    //validate userId
    if(!req.body.userId){
        return res.status(400).send({
            message : "failed ! User Id is not provided"
        })
    }

    //validate userID allready present
    const User = await user.findOne({userId: req.body.userId});
    if(User != null){
        return res.status(400).send({
            message : "failed ! User Id already exist"
        })
    }
    //email presnt 
    if(!req.body.email){
        return res.status(400).send({
            message : "failed ! email is not provided"
        })
    }
    
    //email format
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var tempEmail = req.body.email; 
    // console.log(tempEmail);
    if(!tempEmail.match(regexEmail)){
        return res.status(400).send({
            message : "failed ! email is not in the standard format"
        })
    }




    //unique email 
    const email = await user.findOne({email : req.body.email});
    if(email != null){
        return res.status(400).send({
            message : "failed ! email already exist"
        })
    }


    //password not provided 
    if(!req.body.password){
        return res.status(400).send({
            message : "failed ! password is not provided"
        })
    }

    next();
} 

module.exports = {
    validateSignUpRequest : validateSignupRequest
}