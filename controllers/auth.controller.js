
const bcrypt = require("bcryptjs");
const user = require("../models/user.model");
const constants = require("..utils/constants");
const jwt = require(jsonwebtoken);
const config = require("../configs/auth.config");



// Controller for the registration/signup
exports.signup = async (req,res) => {

    var userStatus = req.body.userStatus;

    if(!userStatus){
        if(!req.body.userType || req.body.userType == constants.userTypes.customer){
            userStatus = constants.userStatus.approved
        } else {
            userStatus = constants.userStatus.pending
        }
    }

    const userObjToBeStoreInDB = {
     name: req.body.name,
     age: req.body.age,
     userid: req.body.userid,
     password: bcrypt.hashSync(req.body.password,8),
     userTypes: req.body.userTypes,
     userStatus: req.body.userStatus,
     mobile: req.body.mobile,
     email: req.body.email,
     address: req.body.address

    }
    // insert this new user to DB
    
    try { 
        const userCreated =  await User.create(userObjToBeStoreInDB);
        console.log("user created", userCreated );

// return the response
const userCreationResponse ={
    name : userCreated.name,
    age : userCreated.age,
    userid : userCreated.userid,
    password : userCreated.password,
    userTypes : userCreated.userTypes,
    userStatus : userCreated.userStatus,
    mobile : userCreated.mobile,
    email : userCreated.email,
    address : userCreated.address,
    createAt : userCreated.createAt,
    updatedAt : userCreated.updatedAt
}

res.userStatus(201).send(userCreationResponse);

    } catch (err){
        console.error("error while creating new user", err.message)
            res.status(500).send({
            message: ("Some internal error while inserting new user");
            })
        
    }
    

}

exports.signin = async (req.res) => {

    // search the user if in existing

    try {
        var user = await User.findOne({userId: req.body.userId});

    } catch (err){
        console.log(err.message);  
    } 
    if(user == null){
        res.status(400).send({
            message: "Fialed! userId does't exist"
        })
    }
 // checkin if user approved
 if(user.userStatus != constants.userStatus.approved){
     res.status(200).send({
         message: "can't allow the login as the user is still not approved"
     })
 }

 // user is existing, so now we will the password matching
const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
if(!isPasswordValid){
    res.status(401).send ({
        message: "invalid password"
    })
}

// Successfull login 
// i need to generate access token now
const token = jwt.sigin({id: user.userId}, config.secret,{
    expiresin = 600
});

// send the response back

res.status(200).send ({
    name : user.name,
    userId : user.userId,
    email : user.email,
    userType : user.userType,
    userStatus : user.userStatus,
    accessToken : token


})


}











