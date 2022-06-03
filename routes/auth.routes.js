/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const authController = require("../controllers/auth.controller");
const { refreshAccessToken } = require("../controllers/token.controller");
const { verifyUserAuthentication, authJwt } = require("../middlewares");

module.exports = (app) => {

    //  POST 127.0.0.1:8080/mba/api/v1/auth/signup
    app.post("/mba/api/v1/auth/signup", [verifyUserAuthentication.verifyUserCreationRequestBody], authController.signup);

    //Sign POST 127.0.0.1:8080/mba/api/v1/auth/signin
    app.post("/mba/api/v1/auth/signin", [verifyUserAuthentication.verifyUserSigninRequestBody], authController.signin);

    // GET /mba/api/v1/accessTokens
    app.get("/mba/api/v1/accessTokens", [authJwt.verifyRefreshToken], refreshAccessToken);
}