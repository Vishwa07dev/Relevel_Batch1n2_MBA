/**
 *  This file keep a track of time at which url was called
 * 
 */

exports.log = (req,res,next) =>{
    console.log("req generated at :",new Date());
    next();
}