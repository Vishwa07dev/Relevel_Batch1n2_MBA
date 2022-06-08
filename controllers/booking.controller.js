/**
 * This file will contain the logic for booking controller
 */
 const Booking = require("../models/booking.model");
 const User = require("../models/user.model");
const constants = require("../utils/constants");
const config = require("../configs/auth.config");

 exports.getAllBookings = async ( req, res) => {
 
     const user = await User.findOne({
        _id: req.userId
    });

    let queryObj = {};

    if(user.userType != constants.userType.admin){
        queryObj.userId = req.userId;
    }

     const bookings = await Booking.find(queryObj);
     res.status(200).send(bookings);
 }
 
  exports.getOneBooking = async (req, res) => {
     try{
         const booking = await Movie.findOne({
             _id: req.params.id
         });
 
         // return found record
         res.status(200).send(booking);
     }catch(err){
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 }

  exports.initiateBooking = async (req, res) => {
 
     const bookingObj = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: req.userId,
        showTime: req.body.showTime,
        noOfSeats: req.body.noOfSeats,
        totalCost: req.body.totalCost
     }
 
     try {
         const booking = await Booking.create(bookingObj);
         
         //creating payment token 
         const paymentToken = jwt.sign({ id: req.userId }, config.secret, {
            expiresIn: 30
        });
         return res.status(201).send(booking,paymentToken);
 
     } catch (err) {
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 
 }
 
 
  exports.updateBooking = async (req, res) => {
 
     try{
         const booking = await Booking.findOne({
             _id: req.params.id
         });
     
         // update respective fields
         booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
         booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
         booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
         booking.totalCost = req.body.totalCost != undefined ? req.body.totalCost : booking.totalCost;
     
         // save updated object
         const updatedBookingObj = await booking.save();
     
         // return saved object
         return res.status(200).send(updatedBookingObj);
     }catch(err){
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
     
 }