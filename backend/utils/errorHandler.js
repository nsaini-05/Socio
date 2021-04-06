class ErrorHandler extends Error{
    construtor(message,statusCode){
        Super(message)
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);

    }
}


module.exports = ErrorHandler