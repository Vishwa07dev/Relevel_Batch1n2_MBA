const Theatre = require("../models/theatre.model");

module.exports = (theatreId, noOfSeats) => {
    const theatre = await Theatre.findOne({
        _id: req.body.theatreId
    });

    return (theatre.ticketPrice * noOfSeats);
}
