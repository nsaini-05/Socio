const express = require("express")
var cookieParser  = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());


//Middleware 

const ErrorHandlerMiddlerware = require('../backend/middlewares/errorsMiddleWare')




//Importing the routes
const user = require('./routes/userRoutes');
app.use('/api/v1',user);

app.use(ErrorHandlerMiddlerware)
module.exports = app;