const Theatre = require("../models/theatre.model");

isValidTheatre = async (req, res, next) => {

    // console.log(req.params.theatreId);
   try {
     const theatre = await Theatre.findOne({_id: req.params.theatreId});

    // console.log("MIDDLEWARE", theatre);
    if(theatre == null || theatre == undefined) {
        return res.status(400).send({message: "please check the theatre Id and try again"});
    } 
    next();
    
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

isMovieIncludesInTheatre = async (req, res, next) => {
    const theatre = await Theatre.findOne({
        _id: req.params.movieId
    });

    if(!theatre.movies.includes(req.params.movieId)) {
        return res.status(400).send({ message: "Movie not found in theatre"});
    }
    next();
}

checkParams = (req, res, next) => {

    if(!req.params.theatreId) {
        return res.status(400).send({ message: "Theatre id missing in req params"});
    }
    if(!req.params.movieId) {
        return res.status(400).send({ message: "movie id missing in req params"});
    }
    next();
}
const theatreCheckPoint = {
    isValidTheatre: isValidTheatre,
    checkFields: checkFields,
    isMovieIncludesInTheatre: isMovieIncludesInTheatre,
    checkParams: checkParams
};

module.exports = theatreCheckPoint;