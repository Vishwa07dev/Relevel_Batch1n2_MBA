const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");

const objectConverter = require("../utils/objectConverter");

exports.getAllTheatres = async (req, res) => {

    const queryObj = {};
    
    if(req.query.name) {
        queryObj.name = req.query.name;
    }
    if(req.query.city) {
        queryObj.city = {
            $in: req.query.city
        };
    }
    if(req.query.pinCode) {
        queryObj.pinCode = {
            $in: req.query.pinCode
        };
    }
    const theatres = await Theatre.find(queryObj);

    return res.status(200).send(theatres);
}

exports.getTheatre = async (req, res) => {
    
    const theatreId = req.params.id;
    try {
        const theatre = await Theatre.findOne({
            _id: theatreId
        });
        console.log("CONTROLLER", theatre)
        return res.status(200).send({
            theatre: theatre
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error while getting theatre"
        });
    }
 }

 exports.createTheatre = async (req, res) => {

    const theatreObjToBeStoredInDB = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        totalSeats: req.body.totalSeats,
    }

    try { 
        const theatreCreated = await Theatre.create(theatreObjToBeStoredInDB);
        if(!theatreCreated) {
              return res.status(500).send({
            message: "Some internal error occurred while creating theatre."
        });
        }
         res.status(201).send(theatreCreated);
    }  catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while creating theatre."
        });
    }
 }

exports.updateTheatre = async (req, res) => {
    
    try {
    const theatre = await Theatre.findOne({
        _id: req.params.id
    });
    
    theatre.name = req.body.name != undefined ? req.body.name: theatre.name;
    theatre.description = req.body.description != undefined ? req.body.description: theatre.description;
    theatre.city = req.body.city != undefined ? req.body.city: theatre.city;
    theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode: theatre.pinCode;
    theatre.totalSeats = req.body.totalSeats != undefined ? req.body.totalSeats: theatre.totalSeats;

    const updatedTheatreDetails = await theatre.save();

    return res.status(200).send({
        message: "Successfully updated theatre details",
        updatedTheatreDetails: updatedTheatreDetails
    });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while updating theatre details."
        });
    }
}

exports.deleteTheatre = async (req, res) => {
    try {
        
        await Theatre.deleteOne({
            _id: req.params.id
        });

        return res.status(200).send({
            message : "Successfully deleted theatre"
        });

    } catch (err) {
        return res.status(500).send({
            message: "Some internal error occurred while deleting theatre."
        });
    }
}

exports.addMovieInsideTheatre = async (req, res) => {
    
    try {
        const theatreId = req.params.theatreId;
        const movieId = req.params.movieId;

        const theatre = await Theatre.findOne({
            _id: theatreId
        }); 
        
        theatre.movies.push(movieId);

        const updatedTheatre = await theatre.save();
        if(!updatedTheatre.movies.includes(movieId)) {
          return res.status(500).send({
            message: "Some internal error occurred while adding theatre."
            });  
        }

        const movie = await Movie.findOne({
        _id: movieId
        })

        movie.theatres.push(theatreId);

        const updatedMovie = await movie.save();

        if(!updatedMovie.theatres.includes(movieId)) {
          return res.status(500).send({
            message: "Some internal error occurred while adding theatre."
            });  
        }

    } catch (err) {
         return res.status(500).send({
            message: "Some internal error occurred while adding theatre."
        });
    }
}

exports.getAllMoviesFromTheatre = async (req, res) => {

    const theatreId = req.params.movieId;
    
    try {
        const theatre = await Theatre.findOne({
            _id: theatreId
        });
        const movies = await Movie.find({
            _id: {
            $in: theatre.movies
            }
        });
        res.status(200).send(objectConverter.moviesListResponse(movies));
    }  catch (err) {
         return res.status(500).send({
            message: "Some internal error occurred fetching movies."
        });
    }

}

exports.getMovieFromTheatre = async (req, res) => {

    const movieId = req.params.movieId;

    try {
        const movie = await Movie.findOne({
            _id: movieId
        });
        console.log(movie)
        return res.status(200).send(movie);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error while getting movie"
        });
    }

}

exports.deleteMovieFromTheatre = async (req, res) => {

    const theatreId = req.params.theatreId;
    const movieId = req.params.movieId;

    try {
        const theatre = await Theatre.findOne({
            _id: theatreId
        });
        
        const movieIndex = theatre.movies.indexOf(movieId);
        theatre.movies.splice(movieIndex, 1);
        const updatedTheatre = await theatre.save();

        if(updatedTheatre.movies.includes(movieId)) {
            console.log(updatedTheatre);
            return res.status(500).send({
            message: "Some internal error while deleting movie from theatre"
            });
        }
        const movie = await Movie.findOne({
            _id: movieId
        });

        const theatreIndex = movie.indexOf(theatreId);
        movie.theatres.splice(theatreIndex, 1);
        const updatedMovie = await movie.save();

        if(updatedMovie.theatres.includes(theatreId)) {
            console.log(updatedMovie);
            return res.status(500).send({
            message: "Some internal error while deleting movie from theatre"
            });
        } 
        return res.status(200).send(updatedTheatre);
    }  catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error while deleting movie from theatre"
        });
    }
}