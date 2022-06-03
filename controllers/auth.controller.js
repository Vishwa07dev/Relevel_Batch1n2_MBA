const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const objectConverter = require("../utils/objectConverter");


/**
 * Controller for signup/registration
 */
exports.signup = async (req, res) => {

    try {

        // Send back if tries to signup as admin
        if (req.body.userType == constants.userType.admin) {
            res.status(200).send({
                message: "Currently ADMIN Singup is not allowed"
            });
        }

        //How the user sign up will happen
        const userObjToBeStoredInDB = {
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            address: req.body.address,
            age: req.body.age,
            userType: req.body.userType,
        }
        if (req.body.userType == constants.userType.theatreOwner) {
            userObjToBeStoredInDB.ownedTheatres = [];
        }

        /**
         * Insert this new user to the db
         */

        const user = await User.create(userObjToBeStoredInDB);

        // return created user
        res.status(201).send(objectConverter.userResponse([user]));
    } catch (err) {
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message: "some internal error while inserting new user"
        })
    }

}


/**
 * Controller for signin
 */
exports.signin = async (req, res) => {

    //Search the user if it exists 
    try {
        var user = await User.findOne({ userId: req.body.userId });
    } catch (err) {
        console.log(err.message);
    }
    if (user == null) {
        return res.status(400).send({
            message: "Failed ! User id doesn't exist"
        })
    }

    //User is existing, so now we will do the password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid Password"
        })
    }

    //** Successfull login */
    //I need to generate access token now
    const token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 60
    });

    const refreshToken = jwt.sign({ id: user.userId }, config.secret, { expiresIn: 600 });

    //Send the response back
    res.status(200).send(objectConverter.userSigninResponse(user, token, refreshToken));
};


// get refresh token
exports.refreshAccessToken = (req, res) => {

    const userId = req.userId;

    const token = jwt.sign({ id: userId }, config.secret, { expiresIn: 60 });

    res.status(200).send({
        newAccessToken: token
    })
}