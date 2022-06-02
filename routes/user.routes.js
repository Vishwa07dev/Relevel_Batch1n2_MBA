/**
* ! Define the routes for the User response
*/

const userController = require("../controllers/user.controller");
const {authUser} = require("../middlewares");


module.exports = (app) => {


    app.put("/mba/api/v1/users/", [authUser.verifyToken], userController.updatePassword);
    
    app.put("/mba/api/v1/users/:id",[authUser.verifyToken, authUser.isAdminOrActualUser], userController.updateUser);

}
