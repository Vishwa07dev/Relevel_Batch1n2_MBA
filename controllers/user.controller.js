const constant = require('../utils/constants');
const user = require('../models/user.model');



exports.updateUserDetail = async (req, res) => {

    try {
        const User = await user.findOne({
            _id: req.params.id
        });
        // update respective fields
        User.name = req.body.name != undefined ? req.body.name : User.name;
        User.email = req.body.email != undefined ? req.body.email : User.email;
        User.age = req.body.age != undefined ? req.body.age : User.age;

        // save updated object
        const updatedUserObj = await User.save();

        // return saved object
        return res.status(200).send(updatedUserObj);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};


exports.updatePassword = async (req, res) => {

    try {
        const User = await user.findOne({
            _id: req.userId
        });

        //user is existing , so now we will do password matching
        const isPasswordValid = bcrypt.compareSync(req.body.oldPassword, User.password)

        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid old Password"
            })
        }

        // update respective fields
        User.password = req.body.newPassword != undefined ? bcrypt.hashSync(req.body.password,8) : User.password;

        // save updated object
        const updatedUserObj = await User.save();

        // return saved object
        return res.status(200).send(updatedUserObj);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

