const express = require("express")
var cookieParser  = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());


//Middleware 

const ErrorHandlerMiddlerware = require('../backend/middlewares/errorsMiddleWare')




//Importing the routes
const user = require('./routes/userRoutes');
const post = require('./routes/postRoutes');
const admin  = require('./routes/adminRoutes');


app.use('/api/v1',admin);
app.use('/api/v1',user);
app.use('/api/v1',post);

app.use(ErrorHandlerMiddlerware)
module.exports = app;