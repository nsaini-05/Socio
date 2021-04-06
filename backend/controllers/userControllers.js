const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAyncErrors = require('../middlewares/catchAsyncErrors');




exports.registerUser = catchAyncErrors(async(req,res,next) =>{
    const user  = await User.create(req.body);
    res.status(201).json({
        success: true,
        user
    }) 
})

/*

exports.registerUser  = async(req,res,next) =>{
    try{
        const user  = await User.create(req.body);
        res.status(200).json({
            success : true,
            user
        })

    }

    catch(error)
    {
        err = new ErrorHandler(error.message ,500);
        next(err);
    }
}


   */