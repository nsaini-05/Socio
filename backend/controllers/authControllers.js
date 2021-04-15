const User = require('../models/user');
const Post = require('../models/post')
const ErrorHandler = require('../utils/errorHandler')
const catchAyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail  = require('../utils/sendEmail');
const crypto = require('crypto');
const { send } = require('process');


const APIFeatures  = require('../utils/apiFeatures');
const { post } = require('../routes/userRoutes');


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
exports.getMyProfile = catchAyncErrors(async(req,res,next)=>{
    //console.log(req.user._id)
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

//Get someone profile(limited details name , and photo only)
exports.getUserProfile = catchAyncErrors(async(req,res,next)=>{
    
    const requestedUserDetails = await User.findById(req.params.id);
    
    if(!requestedUserDetails){
        next(new ErrorHandler("Invalid URL" , 404));
    }

    res.status(200).json({
        success : true,
        requestedUserDetails
    })

})




//Fetch Followers list
exports.getFollowersList = catchAyncErrors(async(req,res,next)=>{
    
    if(user.followers){    
    var followerData = await Promise.all(req.user.followers.map(async(profile_id)=>{
        const user =  await User.findById(profile_id).select('name avatar'); 
        return user;
     }))
    }    
     res.status(200).json({
            success : true,
            following : followerData,
            count  : req.user.followers.length
        });    
})


//Fetch Following list
exports.getFollowingList = catchAyncErrors(async(req,res,next)=>{
    if(user.following){    

var followingData = await Promise.all(req.user.following.map(async(profile_id)=>{
    const user =  await User.findById(profile_id).select('name avatar'); 
    return user;
 }))
}

 res.status(200).json({
        success : true,
        following : followingData,
        count :  req.user.following.length
    })


})



//Get Notifications
exports.getAllNotifications = catchAyncErrors(async(req,res,next)=>{

    
const notificationsData = await Promise.all(req.user.notifications.map(async(profile_id)=>{
    const user =  await User.findById(profile_id).select('name avatar'); 
    return user;
 }))



    res.status(200).json({
        success : true,
        notifications : req.user.notifications
    })
})



//Sending Request to follow a user
exports.sendFollowRequest = catchAyncErrors(async(req,res,next)=>{
    const reciever = await User.findById(req.params.id);

    const alreadyFollowing = reciever.followers.includes(req.user._id);
    if(alreadyFollowing)
    {
        return next(new ErrorHandler("Already Following ",404))
    }

    
    const alreadyRequested = reciever.notifications.includes(req.user._id);
    if(alreadyRequested){
        return next(new ErrorHandler("Already requested to follow",404))
    }   


    if(req.params.id == req.user._id)
    {
        return next(new ErrorHandler("Invalid Request",404))
    }

    //reciever.notifications = [req.user._id]
    reciever.notifications.push(req.user._id)
    reciever.save();
    req.user.save();

    res.status(200).json({
        success :  true,
    })
   
})





//Accept follow request
exports.acceptFollowRequest = catchAyncErrors(async(req,res,next)=>{
    const sender_id = req.params.id;
    if(! req.user.notifications.includes(req.params.id)){
        return next(new ErrorHandler("Invalid Request",404))
    }

    const sender = await User.findById(req.params.id).select('following');
    sender.following.push(req.user._id);
    sender.save();
    
    req.user.followers.push(sender_id);
    req.user.notifications = req.user.notifications.filter(id => id != req.params.id);
    
    req.user.save();
    res.status(200).json({
        success: true
    })
})

//Deny Follow request
exports.denyFollowRequest = catchAyncErrors(async(req,res,next)=>{
    const sender_id = req.params.id   

    if(! req.user.notifications.includes(req.params.id)){
        return next(new ErrorHandler("Invalid Request",404))
    }

    req.user.notifications = req.user.notifications.filter(id => id != req.params.id); 
    req.user.save();
    res.status(200).json({
        success: true
    })
})


//Search Opertations

exports.searchUsers  = catchAyncErrors(async(req,res,next)=>{
    const apiFeatures = new APIFeatures(User.find() , req.query).search().pagination(4);

    const users  = await apiFeatures.query

    res.status(200).json({
        success : true,
        count : users.length,
        users
    })
})



//Fetching the following posts
exports.getFollowingPosts = catchAyncErrors(async(req,res,next)=>{
    const followingIds = req.user.following;


    var posts = await Promise.all(followingIds.map(async (id)=>{
        const post = await Post.findOne({user : id});
        return post
   
    }))
    
   /*
    for(var i = 0 ; i < followingIds.length ; i++){
        const post = await post.findById(id)
        console.log(post);

    }

    */ 


    res.status(200).json({
        success : true,
        posts
       
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