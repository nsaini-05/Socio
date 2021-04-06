const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(500).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //Handling the Cast error
    if (err.name == "Cast Error") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling the Duplicate Values
    if (err.code === 11000) {
      const message = "Duplicate " + Object.keys(err.keyValue) + " entered";
      error = new ErrorHandler(message, 400);
    }

    //Handling the Validation Errors
    if(err.name === 'ValidationError'){
        console.log(Object.values(err.errors))
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400);
    } 


    res.status(err.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
