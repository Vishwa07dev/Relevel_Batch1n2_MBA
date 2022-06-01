const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/dbConfig");
const constants = require("../utils/constants");
const { userTypes } = require("../utils/constants");


// authentication
// if the token passed is valid or not

// if no token passed in the  request header - Not allowed
//if token is passed : authenticated
 //  if correct allow / else reject

 verifyToken = (req,res, next) => {
      
    // read the token from header
    const token = req.headers['x-access-token'];
    if(!token) {
        res.status(403).send ({
            message: " No token provided"
        })
    }

    // if token was provide, we need to verify it
    jwt.verify(token,config.secret,(err, decoded) => {
        if(err){
            res.status(401).send ({
                message: "Unauthrized"
            })
        }

        // i will try to read the userId from the decoded token and store it in the request objrct
        req.userId = decoded.id;
        next();
    })

// if the passed access token is of admin or not
isAdmin = async (req,res, next) => {

    // fetch user from the DB using the userId
    const user = await User.findOne({userId : req.userId})

// check what is the userTypes
if(user && userTypes == constants.userTypes.admin){
    next();
} else {
    res.status(403) ({
        message: "Require ADMIN role"
    })
}

}

const authjwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
} 

module.exports = authjwt;

 }
