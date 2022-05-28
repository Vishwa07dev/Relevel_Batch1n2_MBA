const Movie = require('../models/movie.model');

exports.validateMovieDetails = async (req, res, next) => {
    //validate  if name exists
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! theater name is not exist. "
        })
    }

    //Validate if cast exists
    if (!req.body.cast) {
        return res.status(400).send({
            message: "failed ! theater cast is not exists."
        })
    }
    //validate director if exists
    if (!req.body.director) {
        return res.status(400).send({
            message: "failed ! director is not  exists."
        })
    }
    // validation for trailerUrls
    if (!req.body.trailerUrls) {
        res.status(400).send({
            message: "Failed ! trailerUrls is not exists."
        })
    }
    //validation for posterUrls
    if (!req.body.posterUrls) {
        res.status(400).send({
            message: "Failed ! posterUrls is not exists."
        })
    }
    //checking for languages
    if(!req.body.releaseDate){
        res.status(400).send({
            message : "Failed  releasedate is not added"
        })
    }
 
    next();

}

