const verifyTheatre = require("./theatre.middleware");
const verifySignup = require("./verify.middleware");
const authjwt = require('./authjwt');
module.exports = {
    verifyTheatre,
    verifySignup,
    authjwt
}