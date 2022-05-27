
const theatre = require("../models/theatre.model");


exports.addTheatre = async (req,res) => {
    const theatreObj = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        totalSeats: req.body.totalSeats
    }
    try {
    const theatre = await Theatre.create(theatreObj);
    return res.status(201).send(theatre);

    } catch (err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some Internal error"
        })
 }
 }
 
exports.getAllTheatre = async (req,res) => {

    let queryObj = {};

    if(req.guery.name && req.guery.name !=""){
        queryObj.name = req.query.name
    } 
    if(req.query.city && req.query.city !=""){
        queryObj.city = req.query.city
    }
    if(req.query.description && req.query.description != ""){
        queryObj.description = req.query.description
    }
    if(req.query.pinCode && req.query.pinCode != ""){
    queryObj.pinCode = {
        $in: req.query.cast
    }
    }

const theatre = await theatre.find(queryObj);
res.status(200).send(theatre);

}

exports.getTheatre = async (req,res) => {

    try {

        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

// rerurn found record
        res.status(200).send(theatre);
    } catch(err){
        console.log(err.message);
        return res.status(500).send
({
    message: "Some internal error"
})    
}

}


exports.updateTheatre = async (req,res) => {

    try {
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });


        if(theatre == null) {
            return res.status(400).send({
                message: "Theatre does;t exit"
            })
        }

        // update respective fields
        theatre.name = req.body.name != undefined ? req.body.name : theatre.name;
        theatre.description = req.body.description != undefined ? req.body.description : theatre.description;
        theatre.city = req.body.city != undefined ? req.body.city : theatre.city;
        theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : theatre.pinCode;
    
        // need to save object
    const updateTheatreObj = await theatre.save();

    // return save object
    return  res.status(200).send(updateTheatreObj);

    } catch (err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}
 
// controller for deleting theatre
exports.deleteTheatre = async (req,res) => {

    try {

        const theatre = await theatre.findOne({
            _id: req.params.id
        });
    
        // check theatre valid or not

        if(theatre == null){
return res.status(400).send({
message:  "theatre doesn't exist"
        })
    }
await Theatre.deleteOne({
    _id: req.params.id
});

res.status(200).send({
    message: "Theatre Successfully deleted"
});
} catch (err) {
    console.log(err.message);
    return res.status(500).send({
          message: "Some internal error"
    })
}
}






























