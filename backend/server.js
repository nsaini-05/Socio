const app = require('./app');
const dotenv = require ('dotenv');

//Handling Uncaught Exception
process.on('uncaughtException', (error)=>{
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
})

//environment variables config file
dotenv.config({path: '../Socio/backend/config/config.env'})
const connectDatabase = require('./config/database');
connectDatabase();
const server  = app.listen(process.env.PORT , function(){
    console.log("Server start on " + process.env.PORT +  " in " + process.env.NODE_ENV)
})

//Handle Unhandled Promise Rejection 
process.on('unhandledRejection', error =>{
    console.log(`Error: ${error.message}`);
    console.log("Shutting down wthe server due to the unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    })
})