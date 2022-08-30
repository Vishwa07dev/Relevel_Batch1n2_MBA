/**
 * Getting all the movies
 * 
 * 
 * POST 127.0.0.1:4000/mba/api/v1/movies - POST
 * GET 127.0.0.1:4000/mba/api/v1/movies 
 * GET 127.0.0.1:4000/mba/api/v1/movies 
 */
const Movie = require("../models/movie.model");

exports.getAllMovies = async (req, res) => {
    console.log(`Req-URL: ${req.url}`);

    const queryObj = {};
    
    if(req.query.name) {
        queryObj.name = req.query.name;
    }
    if(req.query.releaseStatus) {
        queryObj.releaseStatus = req.query.releaseStatus;
    }
    if(req.query.cast) {
        queryObj.cast = {
            $in: req.query.cast
        };
    }
    try {
    const movies = await Movie.find(queryObj);

    return res.status(200).send(movies);
    } catch(err) {
        return res.status(500).send({
            message: "Some internal error while getting movie"
        });
    }
}

exports.getMovie = async (req, res) => {
    console.log(`Req-URL: ${req.url}`);
    
    const movieId = req.params.id;
    try {
        const movie = await Movie.findOne({
            _id: movieId
        });
        console.log(movie)
        return res.status(200).send(movie);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error while getting movies"
        });
    }
 }

 exports.createMovie = async (req, res) => {

    const movieObjToBeStoredInDB = {
        name: req.body.name,
        description: req.body.description,
        cast: req.body.cast,
        director: req.body.director,
        trailerUrls: req.body.trailerUrls,
        posterUrls: req.body.posterUrls,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        imdbRating: req.body.imdbRating,
    }

    try { 
        const movieCreated = await Movie.create(movieObjToBeStoredInDB);
        if(!movieCreated) {
              return res.status(500).send({
            message: "Some internal error occurred while creating movie."
        });
        }
         res.status(201).send(movieCreated);
    }  catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while creating movie."
        });
    }
 }

exports.updateMovie = async (req, res) => {
    console.log(`Req-URL: ${req.url}`);

    try {
    const movie = await Movie.findOne({
        _id: req.params.id
    });
    movie.name = req.body.name != undefined ? req.body.name: movie.name;
    movie.description = req.body.description != undefined ? req.body.description: movie.description;
    movie.cast = req.body.cast != undefined ? req.body.cast: movie.cast;
    movie.director = req.body.director != undefined ? req.body.director: movie.director;
    movie.trailerUrls = req.body.trailerUrls != undefined ? req.body.trailerUrls: movie.trailerUrls;
    movie.posterUrls = req.body.posterUrls != undefined ? req.body.posterUrls: movie.posterUrls;
    movie.language = req.body.language != undefined ? req.body.language: movie.language;
    movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate: movie.releaseDate;
    movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus: movie.releaseStatus;

    const updatedMovieDetails = await movie.save();

    return res.status(200).send({
        message: "Successfully updated movie details",
        updatedCompanyDetails: updatedMovieDetails
    });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while updating movie details."
        });
    }
}

exports.deleteMovie = async (req, res) => {
    console.log(`Req-URL: ${req.url}`);
    try {
        await Movie.deleteOne({
            _id: req.params.id
        });

        return res.status(200).send({
            message : "Successfully deleted movie"
        });

    } catch (err) {
        return res.status(500).send({
            message: "Some internal error occurred while deleting movie."
        });
    }
}