const authController = require("../controllers/auth.controller");
const {authUser} = require("../middlewares/index");


module.exports = (app) => {
    
    app.post("/mba/api/v1/auth/signup", [authUser.validateSignupRequest], authController.signup);

  
    app.post("/mba/api/v1/auth/signin", [authUser.validateSigninRequest], authController.signin);

    app.get("/mba/api/v1/auth/accessTokens", [authUser.isValidHeaderToken], authController.createRefreshToken);
}