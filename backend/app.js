const express = require("express")
const app = express();
const dotenv = require ('dotenv');
app.use(express.json());


dotenv.config({path: 'backend/config/config.env'})


//Importing the routes
const user = require('./routes/userRoutes');





app.use('/api/v1',user);
module.exports = app;