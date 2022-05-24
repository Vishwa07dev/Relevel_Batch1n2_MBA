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

/**
 * Controller for the creating a movie
 */


/**
 * Controller for updating a movie
 */


/**
 * Controller for deleting the movie
 */