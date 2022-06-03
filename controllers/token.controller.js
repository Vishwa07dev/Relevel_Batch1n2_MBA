const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");




exports.refreshAccessToken = (req, res) => {

    const userId = req.userId;

    const token = jwt.sign({ id: userId }, config.secret, { expiresIn: 60 });

    res.status(200).send({
        newAccessToken: token
    })
}