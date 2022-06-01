
const { find } = require("../models/user.model");
const user = require("../models/user.model");



exports.addUser = async (req,res) => {

const userObj = {
name: req.body.name,
age: req.body.age,
userId: req.body.userId,
password: req.body.password,
mobile: req.body.mobile,
email: req.body.email,
userType: req.body.userType,
userStatus: req.body.userStatus,
address: req.body.address

} 

try {
    //insert user object into database
     const user = await user.create(userObj);
     // return created user
     return res.userStatus(201).send (user);
} catch (err){
    console.log(err.message);
    return res.status(500).send ({
        message: "Some internal error !"
    })
}


}

exports.updateUser = async (req,res) => {

// one of the way updating
if(!req.params.id){
    res.status(500).send({
        message: "User id not provide"
    });
} try {
    const user = await Users.findOne({userId: req.userId})

    user.name = req.body.name !=undefined ? req.body.name : user.name;
    user.email = req.body.email !=undefined ? req.body.email : user.email;

await user.save();
res.status(200).send({
  message: "User records successfully updated"  
});

} catch (err){
console.log(err.message)
res.status(500).send({
    message: "Internal server error while user updating"
})
}
}
exports.updatePassword = async (req,res) => {
if(!req.body.newPassword){
res.status(500).send ({
    message: "newPassword not provided"
})
}

const userId = req.userId;

try {
    const user = User.findOneAndUpdate({
        userId: userId

    }, {
        password: req.body.newPassword

    }).exec();
    
    res.status(200).send ({
        message: "Password successfully updated"
    });

} catch (err){
console.log(err.message);
res.status(500).send ({
    message: "Internal Server error while updating password"
});
}
}