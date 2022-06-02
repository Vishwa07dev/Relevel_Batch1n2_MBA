const bcrypt = require('bcryptjs');
const constants = require('../utils/constants');
const User = require('../models/user.model'); 
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config');
const authConfig = require('../configs/auth.config');

/**
 * 
 * controller for signUp/registration
 */

exports.signup = async (req, res) => {
     
    //How the user signup/ registration will happen

    const userObjToBeStoredInDb = {
        name :req.body.name,
        userId: req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password: bcrypt.hashSync(req.body.password,8),
    };

    //insert a new user in database
    try{
        
        const newUser = User.create(userObjToBeStoredInDb);

        console.log('user successfully created!');

        return res.status(201).send(newUser);

    }catch(err){
        console.log(err.message);
        return res.status(500).send({
        message: "Some internal error"
       });
   }
    
}



//Controller logic for signin

exports.signin = async (req, res) => {
     

    try{

        const user = await User.findOne({_id : req.body.user})
        
        if(!user){
            return res.status(400).send({
                message : "Failed! User id doesn't exist"
            });
        }
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        
        if(!isValidPassword){
            return res.status(401).send({
                   message : "Invalid Password"
            });
        }

        //Credentials Matched, login successful

        //Now, token can be generated

        const token  = jwt.sign({id :user.userid}, config.secret, 
            { expiresIn: 600
        });
         //send the response back
    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    });


    }catch(err){
        console.log(err.message);
        return res.status(500).send({
        message: "Some internal error"
       });
   }
}