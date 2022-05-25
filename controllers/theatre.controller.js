const Theatre = require("../models/theatre.model");

exports.getAllTheatres = async (req, res) => {

    const queryObj = {};
    
    if(req.query.name) {
        queryObj.name = req.query.name;
    }
    if(req.query.city) {
        queryObj.city = {
            $in: req.query.city
        };
    }
    if(req.query.pinCode) {
        queryObj.pinCode = {
            $in: req.query.pinCode
        };
    }
    const theatres = await Theatre.find(queryObj);

    return res.status(200).send(theatres);
}

exports.getTheatre = async (req, res) => {
    
    const theatreId = req.params.id;
    try {
        const theatre = await Theatre.findOne({
            _id: theatreId
        });
        console.log("CONTROLLER", theatre)
        return res.status(200).send({
            theatre: theatre
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error while getting theatre"
        });
    }
 }

 exports.createTheatre = async (req, res) => {

    const theatreObjToBeStoredInDB = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        totalSeats: req.body.totalSeats,
    }

    try { 
        const theatreCreated = await Theatre.create(theatreObjToBeStoredInDB);
        if(!theatreCreated) {
              return res.status(500).send({
            message: "Some internal error occurred while creating theatre."
        });
        }
         res.status(201).send(theatreCreated);
    }  catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while creating theatre."
        });
    }
 }

exports.updateTheatre = async (req, res) => {
    
    try {
    const theatre = await Theatre.findOne({
        _id: req.params.id
    });
    
    theatre.name = req.body.name != undefined ? req.body.name: theatre.name;
    theatre.description = req.body.description != undefined ? req.body.description: theatre.description;
    theatre.city = req.body.city != undefined ? req.body.city: theatre.city;
    theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode: theatre.pinCode;
    theatre.totalSeats = req.body.totalSeats != undefined ? req.body.totalSeats: theatre.totalSeats;

    const updatedTheatreDetails = await theatre.save();

    return res.status(200).send({
        message: "Successfully updated theatre details",
        updatedTheatreDetails: updatedTheatreDetails
    });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while updating theatre details."
        });
    }
}

exports.deleteTheatre = async (req, res) => {
    try {
        
        await Theatre.deleteOne({
            _id: req.params.id
        });

        return res.status(200).send({
            message : "Successfully deleted theatre"
        });

    } catch (err) {
        return res.status(500).send({
            message: "Some internal error occurred while deleting theatre."
        });
    }
}