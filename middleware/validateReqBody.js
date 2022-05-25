const theatre = require('../models/theatre.model');




const verifyRequestBody = async (req, res, next) => {
    
     //checking if name is provided 
    if (!req.body.name) {
        res.status(400).send({
            message: "Failed! name is not provided !"
        });
        return;
    }

     //checking if description is provided 
    if (!req.body.description) {
        res.status(400).send({
            message: "Failed! description is not provided !"
        });
        return;
    }
    
     //checking if city is provided 
    if (!req.body.city) {
        res.status(400).send({
            message: "Failed! city is not provided !"
        });
        return;
    }

    //checking if pinCode is provided 
    if (!req.body.pinCode) {
        res.status(400).send({
            message: "Failed! pinCode is not provided !"
        });
        return;
    }

    //checking if valid pincode
    const pinCodeLength = req.body.pinCode.lenght 
    if(pinCodeLength < 6 || pinCodeLength > 6){
        res.status(400).send({
            message: "Failed! pinCode is not valid !"
        });
        return;
    }

    //checking for seats
    if (!req.body.totalSeats) {
        res.status(400).send({
            message: "Failed! totalSeats is not provided !"
        });
        return;
    }
};
module.exports = verifyRequestBody;