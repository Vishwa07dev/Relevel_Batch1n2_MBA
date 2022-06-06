const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Constants = require("../utils/constants");

validateSigninRequest = (req, res, next) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Failed ! name is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! password is not provided"
        });
    }
    next();
}

validateSignupRequest = async (req, res, next) => {
    //! Validate if userName exists
    if(!req.body.name) {
        return res.status(400).send({
            message: "Failed ! user name is not provided"
        });
    }
    if(!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "Failed ! Email is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        });
    }
    /**
     * ! Validate if the userId is already exists
     */
    const user = await User.findOne({userId: req.body.userId});
    console.log(user);
    if(user != null) {
        return res.status(400).send({
            message: "Failed ! User Id already exists"
        });
    }
    /**
     * validate also for email,
     * password
     */
    next(); //! Revert back to the controller
}

verifyToken = (req, res, next) => {

    /**
     * ! Read the token from the header
     */

    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(401).send({
            message: "No token provided"
        });
    }

    console.log("token >>", token);
    //! If the token was provided, we need to verify it against
    jwt.verify(token, Config.secret, (err, decoded) =>{
        if(err) {
            console.log("Token expiredAt", err.expiredAt);
            return res.status(401).send({
                message: "Token expired at " + err.expiredAt + ", please create new token"
            });
        } 
        //! I will try to read the userId from the decoded token and store it in the req.userId property
        req.userId = decoded.id;
        next();
    });
}

isAdminOrActualUser = async (req, res, next) => {
    /**
     * Fetch user from the DB using req.userId
     */
    const user = await User.findOne({userId: req.userId});

    /**
     * Check the userType
     */
    if(!user) {
         return res.status(403).send({
            message: "No user Found"
        });
    }
    else if(!((user.userType == Constants.userTypes.admin) || (req.params.id == user.userId))) {
        return res.status(403).send({
            message: "Either owner or admin are allowed to update the details"
        });
    }
    else {
        next();
    }
}
isAdmin = async (req, res, next) => {
    /**
     * Fetch user from the DB using req.userId
     */
    const user = await User.findOne({userId: req.userId});

    /**
     * Check the userType
     */
    if(!user) {
         return res.status(403).send({
            message: "No user Found"
        });
    }
    else if(user.userType != Constants.userTypes.admin)
         return res.status(403).send({
            message: "Requires ADMIN Role"
        });
    else {
       next();
    }
}

isAdminOrTheatreOwner = async (req, res, next) => {
    /**
     * Fetch user from the DB using req.userId
     */
    const user = await User.findOne({userId: req.userId});

    /**
     * Check the userType
     */
    if(!user) {
         return res.status(403).send({
            message: "No user Found"
        });
    }
    else if(!((user.userType == Constants.userTypes.admin) || (user.userType == Constants.userTypes.theatreOwner))) {
        return res.status(403).send({
            message: "Either owner or admin are allowed to update the details"
        });
    }
    else {
        next();
    }
}

isValidRefreshToken =  (req, res, next) => {

   const token = req.headers['x-refresh-token'];

    if(!token) {
        return res.status(401).send({
            message: "No token provided"
        });
    }

    console.log("token >>", token);
     jwt.verify(token, Config.secret, (err, decoded) =>{
        if(err) {
            console.log("Token expiredAt", err.expiredAt);
            return res.status(403).send({
                message: "Refresh Token expired at " + err.expiredAt + ", please create new refresh token"
            });
        } 
        req.userId = decoded.id;
        next();
        return;
    });
}
const authUser = {
    validateSignupRequest: validateSignupRequest,
    validateSigninRequest: validateSigninRequest,
    verifyToken: verifyToken,
    isAdminOrActualUser: isAdminOrActualUser,
    isAdmin: isAdmin,
    isAdminOrTheatreOwner: isAdminOrTheatreOwner,
    isValidRefreshToken: isValidRefreshToken,
};

module.exports = authUser;
