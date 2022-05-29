const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");

isValidMovie = async (req, res, next) => {

    // console.log(req.params.id);
   try {
     const movie = await Movie.findOne({_id: req.params.id});

    // console.log("MIDDLEWARE", movie);
    if(movie == null || movie == undefined) {
        return res.status(400).send({message: "please check the movie Id and try again"});
    } 
    next();
   } catch(err) {
       console.log(err.message);
       return res.status(400).send({message: "please check the movie Id and try again"});
   }
    
} 

isValidMovies = async (req, res, next) => {

    const movieIds = req.body.movies;
    if(req.query.add) req.addMovies = true;
    if(req.query.remove) req.removeMovies = true;
    if(!req.body.movies) {
        return res.status(400).send({message: "Movies must be there in order to do operation"});
    }
    if(req.body.movies.length <= 0) {
        return res.status(400).send({message: "AtLeast one movie has been there"});
    }

    const queryObj = {};

    if(req.addMovies) {
        queryObj._id = {
            $in: movieIds
        }
    }

    if(req.removeMovies) {
       queryObj.theatres = req.params.theatreId;
       queryObj._id = {
           $in: movieIds
       };
    }
   try {

    console.log("QUERYOBJ", queryObj);
    const movies = await Movie.find(queryObj);

    // console.log(movies, "LINE 54");
    if(movieIds.length != movies.length) {
         return res.status(400).send({message: "please check the movie Ids and try again"});
    }
    next();
   } catch(err) {
       console.log(err.message);
       return res.status(400).send({message: "please check the movie Ids and try again"});
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
    isValidMovies: isValidMovies,
    checkFields: checkFields
};

module.exports = authMovie;



// db.movies.find(ObjectId("62923f2ece7ddd8423479e2e"))
// db.movies.find({ _id: { $in: [ObjectId("62923f2ece7ddd8423479e2e",),ObjectId("62923f2ece7ddd8423479e32"), ObjectId("62923f2ece7ddd8423479e36"), ObjectId("62923f2ece7ddd8423479e3a"), ObjectId("62923f2ece7ddd8423479e3e")] } });


