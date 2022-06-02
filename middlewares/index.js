const verifyTheatre = require("./theatre.middleware");
const verifyUser = require("./user.middleware");
const authJwt = require("./authjwt");

module.exports = {
    verifyTheatre,
    verifyUser,
    authJwt
}