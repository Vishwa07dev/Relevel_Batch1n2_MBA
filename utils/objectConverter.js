// logic to transform the object 

exports.userResponse = (users) =>{

    userResponse = [];

    users.forEach(user => {
        userResponse.push({
            name: user.name,
            userId : user.userId,
            email : user.email,
            age : user.age,
            userType : user.userTypes,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt,
            accessToken: user.token
        })    
    });

    return userResponse

}