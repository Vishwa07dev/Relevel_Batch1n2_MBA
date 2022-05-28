const Theatre = require("../models/theatre.model");
const mongoose = require("mongoose");

const isValidTheatreId = async (req, res, next) => {
    try {

        // check whether TheatreId it is valid or not
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({
                message: "Theatre Id Id is not valid"
            })
        }

        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        // check whether theatre exists or not
        if (theatre == null) {
            return res.status(400).send({
                message: "Theatre doesn't exist"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const isValidMovieId = async (req, res, next) => {
    try {

        // check whether TheatreId it is valid or not
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({
                message: "Theatre Id Id is not valid"
            })
        }

        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        // check whether theatre exists or not
        if (theatre == null) {
            return res.status(400).send({
                message: "Theatre doesn't exist"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const verifyAddTheatre = async (req, res, next) => {
    try {

        if (!req.body.name || req.body.name == "") {
            return res.status(400).send({
                message: "Theatre name is required"
            })
        }
        else if (!req.body.description || req.body.description == "") {
            return res.status(400).send({
                message: "Theatre description is required"
            })
        }
        else if (!req.body.city || req.body.city == "") {
            return res.status(400).send({
                message: "Theatre city location is required"
            })
        }
        else if (!req.body.pinCode || req.body.pinCode == "") {
            return res.status(400).send({
                message: "Theatre pinCode is required"
            })
        }
        else if (!req.body.totalSeats || req.body.totalSeats == "") {
            return res.status(400).send({
                message: "Theatre Total Seats is required"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const validateAddOrRemove = (req, res, next) => {
    if (!req.body.insert) {
        return res.status(400).send({
            message: "Please mention whether to insert or remove movie in request body."
        })
    }
    next();
}


const verifyTheatre = {
    isValidTheatreId: isValidTheatreId,
    verifyAddTheatre: verifyAddTheatre,
    validateAddOrRemove: validateAddOrRemove
};
module.exports = verifyTheatre;
