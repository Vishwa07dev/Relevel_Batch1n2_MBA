

exports.validateTheatreReqObj = (req, res, next) => {
    // check for name
    if (!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Please provide theatre name"
        })
    }
    // check for description
    if (!req.body.description) {
        return res.status(400).send({
            success: false,
            message: "Please provide theatre name"
        })
    }
    // check for city
    if (!req.body.city) {
        return res.status(400).send({
            success: false,
            message: "Please provide theatre name"
        })
    }
    // check for pinCode
    if (!req.body.pinCode) {
        return res.status(400).send({
            success: false,
            message: "Please provide theatre name"
        })
    }
    // check for totalSeats
    if (!req.body.totalSeats) {
        return res.status(400).send({
            success: false,
            message: "Please provide theatre name"
        })
    }
    next();
}