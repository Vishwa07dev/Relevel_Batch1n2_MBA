

exports.validateTheatreReqObj = (req, res, next) => {
    // check for name
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please provide theatre name"
        })
    }
    // check for description
    if (!req.body.description) {
        return res.status(400).send({
            message: "Please provide theatre description"
        })
    }
    // check for city
    if (!req.body.city) {
        return res.status(400).send({
            message: "Please provide theatre city"
        })
    }
    // check for pinCode
    if (!req.body.pinCode) {
        return res.status(400).send({
            message: "Please provide theatre pinCode"
        })
    }
    // check for totalSeats
    if (!req.body.totalSeats) {
        return res.status(400).send({
            message: "Please provide theatre totalSeats"
        })
    }
    next();
}