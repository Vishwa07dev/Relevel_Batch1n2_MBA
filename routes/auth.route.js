
// this file will ac as the act for route authentication and authrization

// define the route RESt end point for user registration

const authController = require("../controllers/auth.controller");
const {verifySignup} = require("../middlewares");
const {verifySignin} = require("../middlewares")

module.exports = (app) => {

app.post("/mba/api/v1/auth/signup", [verifySignup.validateSignupRequest], authController.signup);
app.post("/mba/api/v1/auth/signin", [verifySignin.validateSigninRequest],authController.signin);


}
