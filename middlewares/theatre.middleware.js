const Theatre = require("../models/theatre.model");

isValidTheatre = async (req, res, next) => {

    console.log(req.params.id);
   try {
     const theatre = await Theatre.findOne({_id: req.params.id});

    console.log("MIDDLEWARE", theatre);
    if(theatre != null) {
        next();
    } 
    return res.status(400).send({message: "please check the theatre Id and try again"});
   } catch(err) {
       console.log(err.message);
       return res.status(400).send({message: "please check the theatre Id and try again"});
   }
    
} 

checkFields = async (req, res) => {
    if( !(req.body.name && req.body.description && 
        req.body.city && req.body.pinCode && req.body.totalSeats)) {
            
            return res.status(400).send({ message: "Required fields missing"});
        }
    next();
}
const authMovie = {
    isValidTheatre: isValidTheatre,
    checkFields: checkFields
};

module.exports = authMovie;