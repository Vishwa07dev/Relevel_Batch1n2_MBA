/**
 * This file will contain the logic for theatre controller
 */
const { default: mongoose } = require("mongoose");
const Theatre = require("../models/theatre.model");
const constants = require("../utils/constants")
const Movies = require("../models/movie.model")
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

// adding movies inside a theatre
exports.addMoviesToATheatres = async (req, res) => {

    try {
        const theatre = await Theatre.findOne({
            id: req.params.id
        });

        //this will store weater to add or remove movie
        const action = req.body.action;

        if (action == constants.movieAction.add) {

            //getting the movie from the request body 
            const movietoBeStored = req.body.movieId;

            //adding the movie into theatre model 
            theatre.movies.push(movietoBeStored);
            await theatre.save();

            //Finding the movie which is sotred in Theatre using its id 
            const updatedMovie = await Movies.findOne({
                id: req.body.movieId
            })

            //Adding the theatre id in the movie model
            updatedMovie.theatre.push(theatre._id);
            await updatedMovie.save();

            return res.status(200).send({
                message: "Movie Added"
            })
        } else {

            //getting the movie from the request body 
            const movietoBeDeleted = req.body.movieId;

            //Storing the movies array in theatre
            const moviesInATheatre = theatre.movies;

            //Finding the id of movie in the arrya
            var id = moviesInATheatre.indexOf(movietoBeDeleted);

            //removing the movie from the  theatre model 
            const removedMovie = moviesInATheatre.splice(id, 1);
            await theatre.save();


            const movieUpdated = await Movies.findOne({
                id: req.body.movieId
            })

            //getting the id of theatre 
            const theatreToBeDeleted = req.params.id;

            /**
             *  * After removeing the movie from theatre model we also have to remove the theatre from the movie model 
             */

            //Storing the theatre array in movie
            const theatreInAMovie = movieUpdated.theatre;

            //Finding the id of theatre in the arrya
            id = theatreInAMovie.indexOf(theatreToBeDeleted);

            //removing the theatre from the movie model 
            const removedTheatre = theatreInAMovie.splice(id, 1);
            await movieUpdated.save();

            return res.status(200).send({
                message: "Movie Removed"
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal error"
        })
    }
}

//getting all the movies in the theatre
exports.getMoviesInsideATheatre = async (req, res) => {

    try {

        const theatre = await Theatre.findOne({
            id: req.params.id
        });

        //checking if the theatre does not have any movies
        if (theatre.movies.length == 0) {
            return res.status(500).send({
                message: "No movies exist in the theatre"
            });
        }

        //Getting all the movies
        const movies = await Movies.find({
            _id:
            {
                $in: theatre.movies
            }
        });

        return res.status(200).send(movies);

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

//specific movie inside a theatre
exports.getMoviesInsideATheatreBasedOnId = async (req, res) => {

    try {

        const theatre = await Theatre.findOne({
            id: req.params.theatreId
        });

        const movies = await Movies.findOne({
            id: req.params.movieId
        });


        //checking if the theatre does not have any movies
        if (theatre.movies.length == 0) {
            return res.status(500).send({
                message: "No movies exist in the theatre"
            });
        }

        //checking if the movie does not have any theatres
        if (movies.theatre.length == 0) {
            return res.status(500).send({
                message: "No theatre exist in the movie"
            });
        }

        //Checking  weather movie is present or not 
        if (theatre.movies.include(movies._id)) {
            return res.status(200).send({
                message: "The movie is present in the theatre"
            })
        } else {
            return res.status(200).send({
                message: "The movie is not present in the theatre"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}