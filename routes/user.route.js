
const userController = require("../controllers/user.controller")
const {authJwt} = require("../middlewares");

/**
 * Defining the routes for the user resource
 */


module.exports = (app) => {
      
    // PUT  127.0.0.1:8081/mba/api/v1/users/:id
    app.put("/mba/api/v1/users/:id",[authJwt.verifyToken,authJwt.isCustomerAndisAdmin],userController.updateUserDetail);

    // PUT  127.0.0.1:8081/mba/api/v1/users
    app.put("/mba/api/v1/users",[authJwt.verifyToken,authJwt.isCustomer],userController.updatePassword);

}