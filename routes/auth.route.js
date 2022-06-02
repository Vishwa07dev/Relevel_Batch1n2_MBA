const authController = require('../controllers/auth.controller');
const {verifySignup} = require('../middlewares')

module.exports = (app)=>{

    //POST 127.0.0.1:8081/mba/api/v1/auth/signup
    app.post("/mba/api/v1/auth/signup",[verifySignup.validateSignUpRequest],authController.signup);

    //POST 127.0.0.1:8081/mba/api/v1/auth/signin
    app.post("/mba/api/v1/auth/signin",authController.signin);

}