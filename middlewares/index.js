const verifyTheatre = require("./theatre.middleware");
const verifyUser = require("./user.middleware");
const authJwt = require("./authjwt");
const logger = require("./logger.middleware");
const verifyUserAuthentication = require("./auth.middleware");

module.exports = {
    verifyTheatre,
    verifyUser,
    authJwt,
    logger,
    verifyUserAuthentication
}