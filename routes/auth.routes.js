const authController = require('../controllers/auth.controller');
const verifySignup = require('../middlewares');
    
module.exports = (app)=>{
    
    //POST : signup request
    app.post("/mba/api/v1/auth/signup",[verifySignup.validateSignUpRequest], authController.signup);
    //POST : signin request
    app.post("/mba/api/v1/auth/signin", authController.signin);



}