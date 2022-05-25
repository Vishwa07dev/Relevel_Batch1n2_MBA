const Theatre = require("../models/theatre.model");
const mongoose = require("mongoose");

const isValidTheatreId = async (req,res, next) =>{
    try {

        // check whether TheatreId it is valid or not
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
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
};

const verifyTheatre = {
    isValidTheatreId : isValidTheatreId
};
module.exports= verifyTheatre;