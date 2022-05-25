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
exports.getAllMovies = async (req, res) => {
    /**
     * TODO : Extensions
     */
    try {
        const movieReqObj = {};
        // if query param have name
        if (req.query.name && req.query.name != "") {
            movieReqObj.name = req.query.name;
        }
        // if query param have release status
        if (req.query.releaseStatus && req.query.releaseStatus != "") {
            movieReqObj.releaseStatus = req.query.releaseStatus;
        }
        // if query param have release status
        if (req.query.cast && req.query.cast != "") {
            movieReqObj.cast = {
                $in: req.query.cast
            }
        }

        const movies = await Movie.find(movieReqObj);
        res.status(200).send(movies);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error."
        });
    }
}

/**
 * Controller for getting the movie based on id
 */
exports.getMovieDetails = async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });
        res.status(200).send(movie);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error."
        });
    }
}

/**
 * Controller for the creating a movie
 */
exports.createMovie = async (req, res) => {
    try {
        const movieObj = {
            name: req.body.name,
            description: req.body.description,
            cast: req.body.cast,
            director: req.body.director,
            trailerUrls: req.body.trailerUrls,
            posterUrls: req.body.posterUrls,
            language: req.body.language,
            releaseDate: req.body.releaseDate,
            releaseStatus: req.body.releaseStatus,
            imdbRating: req.body.imdbRating
        }
        const movieCreated = await Movie.create(movieObj);
        res.status(200).send(movieCreated);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error."
        });
    }
}

/**
 * Controller for updating a movie
 */

exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });

        // if movie not found
        if (!movie) {
            return res.status(404).send({
                message: "Movie not found."
            })
        }
        // if movie found

        movie.name = req.body.name != undefined ? req.body.name : movie.name;
        movie.description = req.body.description != undefined ? req.body.description : movie.description;
        movie.cast = req.body.cast != undefined ? req.body.cast : movie.cast;
        movie.director = req.body.director != undefined ? req.body.director : movie.director;
        movie.trailerUrls = req.body.trailerUrls != undefined ? req.body.trailerUrls : movie.trailerUrls;
        movie.posterUrls = req.body.posterUrls != undefined ? req.body.posterUrls : movie.posterUrls;
        movie.language = req.body.language != undefined ? req.body.language : movie.language;
        movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : movie.releaseDate;
        movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : movie.releaseStatus;
        movie.imdbRating = req.body.imdbRating != undefined ? req.body.imdbRating : movie.imdbRating;

        const updatedMovie = await movie.save()

        res.status(201).send(updatedMovie);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error."
        });
    }
}
/**
 * Controller for deleting the movie
 */

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });

        // if movie not found
        if (!movie) {
            return res.status(404).send({
                message: "Movie not found."
            })
        }
        await Movie.deleteOne({ _id: req.params.id });

        res.status(201).send(movie);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error."
        });
    }
}