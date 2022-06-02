const express = require('express');
const mongoose = require('mongoose');
const { DB_URL } = require('./configs/dbConfig');
const { PORT } = require('./configs/serverConfig');
const Movie = require('./models/movie.model');
const Theatre = require('./models/theatre.model')
const reqLogger = require("./middlewares/logger.middleware");
const Users = require('./models/user.model')
const seedData = require('./utils/seedData')
const  bcrypt = require('bcryptjs')
const constants = require('./utils/constants')

const app = express();
app.use(express.json());

app.use(reqLogger.log);

// database connection setup
mongoose.connect(DB_URL, async ()=>{
    console.log(`Application is connected to database: ${DB_URL}`);
    
    await Movie.collection.drop();
    await Theatre.collection.drop();
    await Users.collection.drop();

    //inserting seed data
    try{
        // entering seed data
        await seedData.movieData();
        await seedData.theatreData();

   }catch(err){
       console.log(err.message);
   }

    //creating a admin
    const user = await Users.create({
        name: "Vishwa Mohan",
        userId: "admin",
        age : "19",
        email : "Kankvish@gmail.com",
        password: bcrypt.hashSync("Welcome1", 8),
        userType: constants.userType.admin
    });
    console.log("admin created", user);

})


require("./routes")(app);



// express server setup
app.listen(PORT, ()=>{
    console.log(`Application is running on server: http://localhost/${PORT}`);
})