const booking = require("../models/booking.model");
const user = require("../models/user.model");
const movie = require("..models/movie.model");
const theatre = require("../models/theatre.model");
const { bookingStatus } = require("../utils/constants");
const { query } = require("express");

// createBooking object
exports.addBooking = async (req, res) => {
  const bookingObj = {
    theatreId: req.body.theatreId,
    movieId: req.body.movieId,
    userId: req.body.userId,
    showTime: req.body.showTime,
    bookingStatus: req.body.bookingStatus,
    noOfSeats: req.body.noOfSeats,
    totalCost: req.body.totalCost,
  };

  try {
    const booking = await Booking.create(bookingObj);
    return res.status(201).send(booking);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Some internal error",
    });
  }
};

exports.getAllBookings = async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });

  let queryObj = {};

  if (user.userType != constants.userType.admin) {
    queryObj.userId = req.userId;
  }
  const bookings = await Booking.find(queryObj);
  res.status(200).send(bookings);

  // let queryObj = {};

  // if(req.query.theatreId && req.query.theatreId != ""){
  // queryObj.theatreId = req.query.theatreId
  // }
  // if(req.query.movieId && req.query.movieId !=""){
  //     queryObj.movieId = req.query.movieId
  // }
  // if(req.query.userId && req.query.userId !=""){
  //     queryObj.userId = req.query.userId
  // }
  // if(req.query.showTime && req.query.showTime !=""){
  // queryObj.showTime = req.query.showTime
  // }
  // if(req.query.bookingStatus && req.query.bookingStatus !=""){
  //     queryObj.bookingStatus = req.query.bookingStatus
  // }
  // if(req.query.noOfSeats && req.query.noOfSeats !=""){
  //     queryObj.noOfSeats = req.query.noOfSeats
  // }
  // if(req.query.totalCost && req.query.totalCost !=""){
  //     queryObj.totalCost = req.query.totalCost
  // }
};

exports.getOneBooking = async (req, res) => {
  try {
    // get booking based on id from database
    const booking = await Booking.findOne({
      _id: req.params.id,
    });

    // return found record
    res.status(200).send(booking);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Some internal error",
    });
  }
};

// update booking obj
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.find({
      _id: req.params.id,
    });

    // update required fieled
    booking.theatreId =
      req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
    booking.movieId =
      req.body.movieId != undefined ? req.body.movieId : booking.movieId;
    booking.noOfSeats =
      req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;

    // save updated object
    const updatedBookingObj = await booking.save();

    // return save object
    return res.status(200).send(updatedBookingObj);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Some internal error",
    });
  }
};
