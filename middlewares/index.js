const verifyTheatre = require("./theatre.middleware");
const verifySignup = require('./verifySignup');
const authJwt = require('./authjwt');



module.exports = {
    verifyTheatre,
    authJwt,
    verifySignup
}