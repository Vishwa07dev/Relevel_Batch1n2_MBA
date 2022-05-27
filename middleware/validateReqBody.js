const theatre = require("../models/theatre.model");


exports.verifyRequestBody = async (req,res) => {

// checking if name ins provide

if(!req.body.name){
    res.status(400).send({
        message: "Failed! name is not provide !"
    });
    return;
}

// checking is description is provided
if(!req.body.description){
    res.status(400).send({
        message: "Fieled! description is not provided !"  
    });
    return;
}

// checking is city provided
if(!req.body.city){
    res.status(400).send({
        message: "Fieled! description is not provided !"
    });
    return;
}

// checking in pinCode provided
if(!req.body.pinCode){
    res.status(400).send ({
        message: "Fieled! pinCode is not provided !"
    });
    return
}

// checking if valid pinCode 
const pinCodeLength = req.body.pinCode.length

if(pinCodeLength <6 || pinCodeLength > 6){
    res.status(400).send ({
        message: "Fieled! pinCode is not valid !"
    });
    return;
}

// checking for seats
if(!req.body.totalSeats){
res.status(400).send ({
    message: "fieled! totalSeats is not provided !"

});
return;
}
next();
}













