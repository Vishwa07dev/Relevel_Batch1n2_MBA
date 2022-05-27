const Theatre = require("../models/theatre.model");

/**
 * Create a new Theatre
 */
exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pincode: req.body.pincode
    }
    const theatre = await Theatre.create(thatreObject);
    res.status(201).send(theatre);
}
/**
 * Get the list of all the theatres
 */
exports.getAllTheatres = async (rea, res) => {
    const queryObj = {};
    
    if(req.query.name != undefined) {
        queryObj.name = req.query.name;
    }
    if(req.body.city != undefined) {
        queryObj.city = req.query.city;
    }
    if(req.body.pincode != undefined) {
        queryObj.pincode = req.query.pincode;
    }
    const theatres = await Theatre.find(queryObj);
    res.status(200).send(theatres);
}

/**
 * Get the thatres based on theatre id
 */
exports.getTheatre = async (rea, res) => {
    const theatre = await Theatre.findOne({
        _id: req.params.id
    });
    res.status(200).send(theatre);
}

/**
 * Update a theatre
 */
exports.updateTheatre = async (rea, res) => {

    const savedTheatre = await Theatre.findOne({ _id: req.params.id });
    
    if(!savedTheatre) {
        return res.status(400).send({
            message : "Theatre being updated doesn't exist "
        });
    }

    savedTheatre.name = req.body.name != undefined ? req.body.name : savedTheatre.name;
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pincode = req.body.pincode != undefined ? req.body.pincode : savedTheatre.pincode;

    var updateTheatre = await savedTheatre.save();

    rea.status(200).send(updateTheatre);
}
 

/**
 * Delete a thetre
 */
exports.deleteTheatre  = async (req, res) => {
    await Theatre.deleteOne  ({
        _id: req.params.id
    });
    res.status(200).send({
        message : "Successfully deleted theatre with id [" +req.params.id + " ]"
    });
    
}