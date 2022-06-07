const payment = require("../models/payment.model");
const booking = require("../models/booking.model");


exports.createPayment = async (req, res) => {

 const paymentObj = {
     bookingId: req.body.bookingId,
     ammount: req.body.ammount,
     paymentStatus: req.body.paymentStatus
 };

 try {
const payment = await Payment.create(paymentObj)
return res.status(201).send(payment);

 } catch (err) {
     console.log(err.message);
     return res.status(500).send ({
         message: "Some internal error"
     });
 }
};

exports.getAllpayments = async (req, res) => {
const user =  await User.findOne({
    _id: req.userId

});
 let queryObj = {}
if(user.userType != constants.userType.admin){
    queryObj.userId = req.userId
    const paymets = await Payments.findOne(queryObj)
    res.status(200).send(paymets)
}

}