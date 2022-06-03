const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const constant = require('../utils/constants');
const user = require('../models/user.model');
const config = require('../configs/auth.config')
const objectConverter = require('../utils/objectConverter')

exports.signup = async (req,res) => {


    const userObjToBeStored ={

        name:req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        age : req.body.age,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8)
    }
    //inserting new user to database
    try{
            
        const userCreated = await user.create(userObjToBeStored) ;

        console.log("user created",userCreated);
        

        res.status(201).send(objectConverter.userResponse(userCreated)) 
    }catch(err){
        console.error("Error while creating new user",err.message);
        res.status(500).send({
            message : "some internal error while inserting new user"
        })
    }
}

// login

exports.signin = async (req,res) =>{

    try{

        //already exisit
        var users = await user.findOne({userId : req.body.userId});

    }catch(err){
        
        console.log(err.message);
        return res.status(404).send({
            message : "user not found"
        })

    }

    if(users == null){
        return res.status(400).send({
            message : "Failed ! User id does not exist"
        })
    }
    

    //user is existing , so now we will do password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, users.password)

    if(!isPasswordValid){
        return res.status(401).send({
            message:"Invalid Password"
        })
    }

    // succesfully loged in 
    // generate token

    const token = jwt.sign({id: users.userId},config.secret,{
        expiresIn:10000
    });
    user.token = token;
    res.status(200).send(objectConverter.userResponse(userCreated))
};
 