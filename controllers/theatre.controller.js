/**
 * This file will contain the logic for theatre controller
 */
const Theatre = require("../models/theatre.model");
const Movie = require('../models/movie.model');

/**
 * Getting all the theatres
 * 
   * Supporting the following query params
   * mba/api/v1/theatres?city=<>
   * 
   * mba/api/v1/theatres?pinCode=<>
   * 
 *      
 */
exports.getAllTheatres = async (req, res) => {

    let queryObj = {};

    if (req.query.city && req.query.city != "") {
        queryObj.city = req.query.city
    }
    if (req.query.pinCode && req.query.pinCode != "") {
        queryObj.pinCode = req.query.pinCode
    }

    const theatres = await Theatre.find(queryObj);
    res.status(200).send(theatres);
}

/**
 * Controller for getting the theatre based on id
 */
exports.getTheatre = async (req, res) => {
    try {
        // get theatre based on id from database
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        // return found record
        res.status(200).send(theatre);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * Controller for the creating a theatre
 */
exports.createTheatre = async (req, res) => {

    // prepare theatre object to store inside database
    const theatreObj = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        totalSeats: req.body.totalSeats
    }

    try {
        // insert theatre object into database
        const theatre = await Theatre.create(theatreObj);

        // return created theatre
        return res.status(201).send(theatre);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}


/**
 * Controller for updating a theatre
 */
exports.updateTheatre = async (req, res) => {

    try {
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        // update respective fields
        theatre.name = req.body.name != undefined ? req.body.name : theatre.name;
        theatre.description = req.body.description != undefined ? req.body.description : theatre.description;
        theatre.city = req.body.city != undefined ? req.body.city : theatre.city;
        theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : theatre.pinCode;
        theatre.totalSeats = req.body.totalSeats != undefined ? req.body.totalSeats : theatre.totalSeats;

        // save updated object
        const updatedTheatreObj = await theatre.save();

        // return saved object
        return res.status(200).send(updatedTheatreObj);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}


/**
 * Controller for deleting the theatre
 */
exports.deleteTheatre = async (req, res) => {
    try {
        // delete object from database
        await Theatre.deleteOne({
            _id: req.params.id
        });

        res.status(200).send({
            message: "Theatre succesfully deleted"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

// add movies to theatre
exports.addOrRemoveMovies = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.theatreId });
        const movie = await Movie.findOne({ _id: req.params.movieId });
        // if theatre not found
        if (!theatre) {
            return res.status(404).send({
                message: "Please enter valid theatre Id."
            })
        }
        // if movie not found
        if (!movie) {
            return res.status(404).send({
                message: "Please enter valid movie Id."
            })
        }

        if (req.body.insert === true) {
            // push movie into theatre
            theatre.movies.push(movie._id);
            // save updated theatre
            await theatre.save();
            // push theatre into movie
            movie.theatres.push(theatre._id);
            // save updated movie
            await movie.save();
        }
        else if (req.body.remove === true) {
            // get movie index
            let movieIndex = theatre.movies.indexOf(movie._id);
            // remove movie
            theatre.movies.splice(movieIndex, 1);
            // save updated theatre
            await theatre.save();
            // get theatre index
            let theatreIndex = movie.theatres.indexOf(theatre._id);
            // remove theatre
            movie.theatres.splice(theatreIndex, 1);
            // save updated movie
            await movie.save();
        }
        res.status(201).send(theatre);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error.",
        })
    }
}

// get movies from a theatre
exports.getMoviesFromTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.params.theatreId);
        // if theatre not found
        if (!theatre) {
            return res.status(404).send({
                message: "Please enter valid theatre Id."
            })
        }

        let movieIds = theatre.movies;
        let movies = [];
        for (let id of movieIds) {
            let movie = await Movie.findById(id);
            movies.push(movie);
        }
        // send all movies
        res.status(200).send(movies);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error.",
        })
    }
}

// get specific movie from theatre;
exports.getMovieByIdfromTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.params.theatreId);
        // if theatre not found
        if (!theatre) {
            return res.status(404).send({
                message: "Please enter valid theatre Id."
            })
        }

        let movieIds = theatre.movies;
        if (!movieIds.includes(req.params.movieId)) {
            return res.status(404).send({
                message: `The movie ${req.params.movieId} is not found in ${theatre._id} theatre.`
            })
        } else {
            const movie = await Movie.findById(req.params.movieId);

            return res.status(200).send(movie);;
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error.",
        })
    }
}