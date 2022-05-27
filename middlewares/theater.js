const Theater = require("../models/theater.model");

exports.validateTheater = async (req, res, next) => {
    //validate  if theaterName exists
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! theater name is not exist. "
        })
    }

    //Validate if city exists
    if (!req.body.city) {
        return res.status(400).send({
            message: "failed ! theater city is not exists."
        })
    }
    //validate pinCode if exists
    if (!req.body.pinCode) {
        return res.status(400).send({
            message: "failed ! pinCode is not  valid."
        })
    }
    // validation for totalSeats
    if (!req.body.totalSeats) {
        res.status(400).send({
            message: "Failed ! totalSeats  are not exists."
        })
    }
    //validation for description
    if (!req.body.description) {
        res.status(400).send({
            message: "Failed ! description is not exists."
        })
    }

    next();

}


