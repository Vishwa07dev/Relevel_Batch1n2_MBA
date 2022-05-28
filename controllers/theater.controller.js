const Theater = require("../models/theater.model");
const Movie = require("../models/movie.model");


exports.addTheater = async (req, res) => {

    // add theater
    const theaterObj = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        totalSeats: req.body.totalSeats
        
    }

    try {
        // insert theater object into database
        const theater = await Theater.create(theaterObj);

        // return created theater
        return res.status(201).send(theater);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }

}

exports.getAllTheaters = async ( req, res) => {
 
    let queryObj = {};

    if(req.query.name && req.query.name != ""){
        queryObj.name = req.query.name
    }
    if(req.query.city && req.query.city != ""){
        queryObj.city = req.query.city
    }
    if(req.query.pinCode && req.query.pinCode != ""){
        queryObj.pinCode = req.query.pinCode
    }


    const theaters = await Theater.find(queryObj);
    res.status(200).send(theaters);
}

exports.getOneTheater = async (req, res) => {
    try{
        // i want to see theater based on id from database
        const theater = await Theater.findOne({
            _id: req.params.id
        });

        // return found record
        res.status(200).send(theater);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal  server error"
        })
    }
}


exports.updateTheater = async (req, res) => {

    try{
        const theater = await Theater.findOne({
            _id: req.params.id
        });
    
        // check whether theater exists or not
        if (theater == null) {
            return res.status(400).send({
                message: "Theater doesn't exist"
            })
        }
    
        // update respective fields
        theater.name = req.body.name != undefined ? req.body.name : theater.name;
        theater.description = req.body.description != undefined ? req.body.description : theater.description;
        theater.city = req.body.theater != undefined ? req.body.city : theater.city;
        theater.pinCode = req.body.pinCode != undefined ? req.body.pinCode: theater.pinCode;
        theater.totalSeats = req.body.totalSeats != undefined ? req.body.totalSeats : theater.totalSeats
        // save updated object
        const updatedTheaterObj = await theater.save();
    
        // return saved object
        return res.status(200).send(updatedTheaterObj);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
    
}

exports.deleteTheater = async (req, res) => {
    try {
        const theater = await Theater.findOne({
            _id: req.params.id
        });

        // check whether theater is valid or not
        if (theater == null) {
            return res.status(400).send({
                message: " Theater doesn't exist"
            })
        }

        // delete object from the database
        await Theater.deleteOne({
            _id: req.params.id
        });

        res.status(200).send({
            message : "Theater is succesfully deleted"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal  server error"
        })
    }
}

exports.addMoviesInTheater = async (req, res)=>{
    const  theater = await Theater.findOne({ _id: req.params.id });

    movieIds = req.body.movieIds;

    //Add movieIds to the theatres
    if (req.body.insert) {
        movieIds.forEach(movieId => {
            theater.Movie.push(movieId);
        });
    } else {
        //remove these movies from the theatres
       savedMovie = theater.Movie;

        movieIds.forEach(movieId => {
         savedMovie = savedMovie.filter(smi => smi != movieId);
        });
        theater.Movie = savedMovie;
    }


    await theater.save(); //save in the database
    res.status(200).send(theater);

}