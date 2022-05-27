const constants = require("../utils/constants");

validateMovieReqBody = async (req, res) => {
    //validate the movie name
    if(!req.body.name) {
        return res.status(400).send({
            message : "Failed Movie name is not provided !"
        });
    }

    // Validate  the movie status 
    if(!req.body.releaseStatus) {
        return res.status(400).send({
            message : "Failed Movie release status is not provided !"
        });
    }

    //checking for the corect value of status 
    const releaseStatus = req.body.releaseStatus;
    const releaseStatusType = [constants.releaseStatuses.unreleased, constants.releaseStatuses.released, constants.releaseStatuses.blocked];
    if(!releaseStatusType.includes(releaseStatus)) {
        return res.status(400).send({
            message : "Movie release status provided is invalid Possible values UNRELEASED | RELEASED | BLOCKED "
        });

    }
    //validate the released date 
    if(!req.body.releaseDate) {
        return res.status(400).send ({
            messsage : "Failed! Movie released date is not provided!"
        });

    }
    //validate the director 
    if(!req.body.director) {
        return res.status(400).send({
            message : "Failed Movie director is not provided !"
        });
    }
    next();
}

const verifyMovieReqBody = {
    validateMovieReqBody : validateMovieReqBody
};

module.exports = verifyMovieReqBody;