/**
 * This file will contain the logic for theatre controller
 */
 const Theatre = require("../models/theatre.model");

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
 exports.getAllTheatres = async ( req, res) => {

     let queryObj = {};
 
     if(req.query.city && req.query.city != ""){
         queryObj.city = req.query.city
     }
     if(req.query.pinCode && req.query.pinCode != ""){
         queryObj.pinCode = req.query.pinCode
     } 
 
     const theatres = await Theatre.find(queryObj);
     res.status(200).send(theatres);
 }
 
 /**
  * Controller for getting the theatre based on id
  */
  exports.getTheatre = async (req, res) => {
     try{
         // get theatre based on id from database
         const theatre = await Theatre.findOne({
             _id: req.params.id
         });
 
         // return found record
         res.status(200).send(theatre);
     }catch(err){
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
        name : req.body.name,
        description : req.body.description,
        city : req.body.city,
        pinCode : req.body.pinCode,
        totalSeats : req.body.totalSeats
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
 
     try{
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
     }catch(err){
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
             message : "Theatre succesfully deleted"
         });
     } catch (error) {
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 }