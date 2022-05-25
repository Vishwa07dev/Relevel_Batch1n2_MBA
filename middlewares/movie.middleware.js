const Movie = require("../models/movie.model");

isValidMovie = async (req, res, next) => {

    console.log(req.params.id);
   try {
     const movie = await Movie.findOne({_id: req.params.id});

    console.log("MIDDLEWARE", movie);
    if(movie != null) {
        next();
        return;
    } 
    return res.status(400).send({message: "please check the movie Id and try again"});
   } catch(err) {
       console.log(err.message);
       return res.status(400).send({message: "please check the movie Id and try again"});
   }
    
} 

checkFields = async (req, res) => {
    if( !(req.body.name && req.body.description && 
        req.body.cast && req.body.director && req.body.trailerUrls
        && req.body.postUrls && req.body.language && req.body.releaseStatus)) {
            
            return res.status(400).send({ message: "Required fields missing"});
        }
    next();
}
const authMovie = {
    isValidMovie: isValidMovie,
    checkFields: checkFields
};

module.exports = authMovie;