const express = require("express")
const app = express();
app.use(express.json());


//Middleware 

const ErrorHandlerMiddlerware = require('../backend/middlewares/errorsMiddleWare')




//Importing the routes
const user = require('./routes/userRoutes');
app.use('/api/v1',user);

app.use(ErrorHandlerMiddlerware)
module.exports = app;