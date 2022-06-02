/**
 * this file willcontain the routes for user controller
 */

const userController = require('../controllers/user.controller');

const {authjwt} = require("../middlewares");

module.exports = (app)=>{
 
    // PUT change password for user
    // UPDATE CALL
    app.put("/mba/api/v1/users/",[authjwt.verifyToken], userController.updatePassword);
 
    // PUT change  user attributes
    // UPDATE CALL
    app.put("/mba/api/v1/users/:id",[authjwt.verifyToken, authjwt.isAdmin], userController.updateUser);
 

}