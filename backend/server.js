const app = require('./app');
const dotenv = require ('dotenv');
const connectDatabase = require('./config/database');


//environment variables config file
dotenv.config({path: 'backend/config/config.env'})


connectDatabase();




app.listen(process.env.PORT , function(){
    console.log("Server start on " + process.env.PORT +  " in " + process.env.NODE_ENV)
})
