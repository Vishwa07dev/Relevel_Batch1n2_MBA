const Theatre = require('../models/theatre.model');



exports.createTheatre = async (req, res) => {
    const theatreObj = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        totalSeats: req.body.totalSeats
    }
    try {
        const createdTheatre = await Theatre.create(theatreObj);

        res.status(201).send({
            success: true,
            createdTheatre
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Some Internal Error While Adding Theatre."
        })
    }
}

// get all thatres
exports.getAllTheatres = async (req, res) => {

    const queryObj = {};
    // check for city
    if (req.query.city && req.query.city != "") {
        queryObj.city = req.query.city
    }
    // check for pincodes
    if (req.query.pinCode && req.query.pinCode != "") {
        queryObj.pinCode = req.query.pinCode
    }
    try {
        const theatres = await Theatre.find(queryObj);

        res.status(200).send({
            success: true,
            theatres
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Some Internal Error While Fetching Theatres."
        })
    }
}

// get  theatre based on ID
exports.getTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });

        if (!theatre) {
            return res.status(404).send({
                success: false,
                message: `No theatre found with id: ${req.params.id}`
            })
        }

        res.status(200).send({
            success: true,
            theatre
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Some Internal Error While Fetching Theatre."
        })
    }
}

// update  theatre based on ID
exports.updateTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });

        if (!theatre) {
            return res.status(404).send({
                success: false,
                message: `No theatre found with id: ${req.params.id}`
            })
        }

        // update theatre
        theatre.name = req.body.name != undefined ? req.body.name : theatre.name;
        theatre.description = req.body.description != undefined ? req.body.description : theatre.description;
        theatre.city = req.body.city != undefined ? req.body.city : theatre.city;
        theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : theatre.pinCode;
        theatre.totalSeats = req.body.totalSeats != undefined ? req.body.totalSeats : theatre.totalSeats;

        // save updated theatre
        const updatedTheatre = await theatre.save();

        res.status(200).send({
            success: true,
            updatedTheatre
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Some Internal Error While updating Theatre."
        })
    }
}

// delete  theatre based on ID
exports.deleteTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });

        if (!theatre) {
            return res.status(404).send({
                success: false,
                message: `No theatre found with id: ${req.params.id}`
            })
        }
        // delete theatre
        await Theatre.deleteOne({ _id: req.params.id });

        res.status(200).send({
            success: true,
            theatre
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Some Internal Error While deleting Theatres."
        })
    }
}