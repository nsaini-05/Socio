const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail  = require('../utils/sendEmail');
const crypto = require('crypto');

//Register User => /api/v1/resgister
exports.registerUser = catchAyncErrors(async(req,res,next) =>{
    const user  = await User.create(req.body);
   sendToken(user , 200 ,res)
})


//User login  => /api/v1/login
exports.loginUser = catchAyncErrors(async(req,res,next)=>{
    /*
    const {token} = req.cookies;
    if(token){
        return next(new ErrorHandler('User already signed in'));
    }
    */


    const {email , password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",404))
    }
    const user = await User.findOne({email : email}).select('+password');

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password" , 404));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password" , 401));
    }
    sendToken(user , 200 ,res)
})

//logout user
exports.logout = catchAyncErrors(async(req,res,next)=>{
    res.cookie('token' , null , {expires : new Date(Date.now())})
    res.status(200).json({
        success : true
    })
})

//Forgot Password
exports.forgotPassword = catchAyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    const resetToken  = user.getResetPasswordToken();
    await user.save({validationBeforeSave: true});
    

    //Creating the password Reset URL 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow :\n${resetUrl}\n\nIf you have not requested this email, then ignore it`;

    try{
        await sendEmail({email:user.email,
        subject : "Socio Password Recovery",
        message})


        res.status(200).json({
            success : true,
            message : "Email Sent to user"
        })
    }

    catch(error)
    {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save({validationBeforeSave : false})
        return next(new ErrorHandler(error.message , 500));
    }   

})



//Reset the password
exports.resetPassword = catchAyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
        $gt : Date.now()
    }})


    if(!user){
        return next(new ErrorHandler('Password Reset Token Expire', 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
   
    
    await user.save();
    sendToken(user , 200 ,res);

})


//Get user profile
exports.getUserProfile = catchAyncErrors(async(req,res,next)=>{
    console.log(req.user._id)
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success : true,
        user
    })
})


//Updating the user passsword

exports.updatePassword = catchAyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user._id).select('+password');
    const {oldPassword , newPassword} = req.body;
    const isPasswordMatched = user.comparePassword(oldPassword);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password"));
    }

    user.password = newPassword;
    await user.save();
    sendToken(user , 200 , res)
})

//Updating User Profile 
exports.updateProfile =  catchAyncErrors(async(req,res,next)=>{
    const updatedData = {email : req.body.email,name : req.body.name , username :req.body.userName}
    const user = await User.findByIdAndUpdate(req.user._id, updatedData, {new : true ,
        runValidators : true,
        useFindAndModify : false})


res.status(200).json({
    success : true
  })
})



/*
exports.sample = catchAyncErrors(async(req,res,next)=>{
    const user = req.user;
    user.getResetPasswordToken();

})

exports.getSensitiveInformation = catchAyncErrors(async function(req,res,next){
    console.log("reached at the final ")
    res.status(200).json({
        success : true
    })
})




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