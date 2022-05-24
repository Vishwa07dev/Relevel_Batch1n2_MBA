/**
 * This file will contain the logic for movie controller
 */
const Movie = require("../models/movie.model");

/**
 * Getting all the movies
 * 
 *     127.0.0.1:8080/mba/api/v1/movies - All the movies
 *     
 *     Query params :
 *     Extensions : 
 *     127.0.0.1:8080/mba/api/v1/movies?name=<>
 *      
 *     127.0.0.1:8080/mba/api/v1/movies?releaseStatus=<>
 * 
 *     127.0.0.1:8080/mba/api/v1/movies?cast=<>
 *      
 */
exports.getAllMovies = async ( req, res) => {
    /**
     * TODO : Extensions
     */
    const movies = await Movie.find();
    res.status(200).send(movies);
}

/**
 * Controller for getting the movie based on id
 */
 exports.getMovie = async (req, res) => {
    const movie = await Movie.findOne({
        _id: req.params.id
    });
    res.status(200).send(movie);

}

/**
 * Controller for the creating a movie
 */
 exports.createMovie = async (req, res) => {
    const movieObject = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        director: req.body.director,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        releaseSatus: req.body.releaseSatus
    }

    const movie = await Movie.create(movieObject);
    res.status(201).send(movie);
}

/**
 * Controller for updating a movie
 */
 exports.updateMovie = async (req, res) => {

    const savedMovie = await Movie.findOne({ _id: req.params.id });

    if (!savedMovie) {
        res.status(400).send({
            message: "Movie being updated doesn't exist"
        });
    }

    savedMovie.name = req.body.name != undefined ? req.body.name : savedMovie.name,
        savedMovie.description = req.body.description != undefined ? req.body.description : savedMovie.description,
        savedMovie.casts = req.body.casts != undefined ? req.body.casts : savedMovie.casts,
        savedMovie.director = req.body.director != undefined ? req.body.director : savedMovie.director,
        savedMovie.trailerUrl = req.body.trailerUrl != undefined ? req.body.trailerUrl : savedMovie.trailerUrl,
        savedMovie.posterUrl = req.body.posterUrl != undefined ? req.body.posterUrl : savedMovie.posterUrl,
        savedMovie.language = req.body.language != undefined ? req.body.language : savedMovie.language,
        savedMovie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : savedMovie.releaseDate,
        savedMovie.releaseSatus = req.body.releaseSatus != undefined ? req.body.releaseSatus : savedMovie.releaseSatus

    var updatedMovie = await savedMovie.save();

    res.status(200).send(updatedMovie);
}


/**
 * Controller for deleting the movie
 */
 exports.deleteMovie = async (req, res) => {

    await Movie.deleteOne({
        _id: req.params.id
    });
    res.status(200).send({
        message : "Successfully delete movie with id [ " + req.params.id + " ]"
    });

};