const  jwt      = require("jsonwebtoken");
const config    = require("../configs/auth.config");
const  User     = require('../models/user.model');
const constants = require("../utils/constants")


    /**
 * Authentication
 *    - if the token is valid or not 
 * 
 *       if no token is passed 
 */



verifyToken = (req, res, next) =>{
    /***
     * read the token from the header
     */
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(400).send({
            message: "No token provided"
        })
    }

    //if the token was provided, we need to verify it

    jwt.verify(token, config.secret, (err, decoded) =>{

    if(err){
        return res.status(401).send({
            message: "Unauthorised"
        });
    }
    // try to read the userId from the decoded token and store it in req object
    req.userId = decoded.id;
    next();
    })
}



/**
 * if the passed authToken is of ADMIN or not 
 */

isAdmin = async (req, res, next) => {
    /**
     * fetchusers from the db uing the userId
     */

    const user = await User.findOne({userId : req.userId});

    /**
     * check what is the user type
     */

    if(user && user.userType === constants.userTypes.admin){
        next();
    }else{
        res.status(403).send({

            message: " Requires ADMIN role"
        })
    }

}

/**
 * Check if the user is a theatre owner or not
 */

const isAdminOrTheatreOwner = async (req, res, next) => {
    /**
     * fetchusers from the db uing the userId
     */

    const user = await User.findOne({userId : req.userId});

    /**
     * check what is the user type
     */

    if(user && 
        (user.userType === constants.userTypes.admin 
        ||
         user.userType === constants.userTypes.theatre_owner)){
        next();
    }else{
        return res.status(403).send({

            message: " Requires admin or theatre Owner role"
        })
    }

}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrTheatreOwner : isAdminOrTheatreOwner 
};   

module.exports = authJwt;