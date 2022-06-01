const {off} = require("../models/user.model");
const user = require("..models/user.model");
const {authUser} = require("../middlewares");


module.exports = (app) => {

app.put("/mba/api/v1/users/" [authUser.verifyToken], userController.updatePassword);

app.put("mba/api/v1/users/:id" [authUser.verifyToken, authUser.isAdminOrActualUser], userController.updateUser);

}

