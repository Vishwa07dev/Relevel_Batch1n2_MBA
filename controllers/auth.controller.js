const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const objectConverter = require("../utils/objectConverter")

exports.signup = async (req, res) => {

    
    var userType;

//     //! DEFAULT user customer
    userType = (req.body.userType != undefined) ? req.body.userType : constants.userTypes.customer;

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: userType,
        password: bcrypt.hashSync(req.body.password, 8),
    }
    // console.log("userObj", userObj);
    /**
     * ! Insert this new user into the database
     */
   try {
     const userCreated = await User.create(userObj);
    //  console.log("user created", userCreated);
    /**
//      * ! Return the response
//      */
    res.status(201).send(objectConverter.userSignUpObject(userCreated));
   } catch (err) {
        console.error("Error while creating user", err.message);
        res.status(500).send({
            message: "Internal server error while creating user"
        });

   }    
}

// /**
//  * ! Controller for signin
//  */

exports.signin = async (req, res) => {

  try {
        //! Search the user if exists
    const user = await User.findOne({userId: req.body.userId});

    if(user == null) {
        return res.status(400).send({
            message: "Failed ! User id doesn't exist"
        });
    }
 
//     //! User is existing, so now will do the password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    console.log(isPasswordValid);

    if(!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid Password"
        });
    }

    /**
     * ? Successful  login 
     * ? I need to generate access token now
     */
    const accessToken = jwt.sign({id: user.userId}, config.secret, {
        expiresIn: 60
    });
    user.accessToken = accessToken;

    const refreshToken = jwt.sign({id: user.userId}, config.secret, {
        expiresIn: 600
    });
    user.refreshToken = refreshToken;
    
//     //! Send the response 
    return res.status(200).send(objectConverter.userSignInObject(user));
  } catch (err) {
    console.error("Error while login", err.message);
        res.status(500).send({
            message: "Internal server error while login"
        });
  }
}

exports.createRefreshToken = async (req, res) => {

    try {
        // const oldToken = req.headers['x-refresh-token'];
        const userId = req.userId;
        const refreshToken = jwt.sign({id: userId}, config.secret, {
        expiresIn: 600
        });

    return res.status(200).send({
        userId: req.userId,
        refreshToken: refreshToken,
    });
       
    } catch (err) {
        console.error("Error while login", err.message);
        res.status(500).send({
            message: "Internal server error creating refresh token"
        });
    }
}
//   const accessToken = jwt.sign({id: "uday"}, 'secret', {
//         expiresIn: 600
//     });

//     console.log(accessToken);

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVkYXkiLCJpYXQiOjE2NTQyNzUyNzgsImV4cCI6MTY1NDI3NTg3OH0.mD4CCPPmMjvfg-4Kc_JPvy1uZUhe4gzUYfSODI_lzCs';
//    jwt.verify(token, 'secret', (err, decoded) =>{
//         if(err) {
//             console.log("Token expiredAt", err);

//         } 
//         console.log(decoded);
        // { id: 'uday', iat: 1654275278, exp: 1654275878 }
       
//     });