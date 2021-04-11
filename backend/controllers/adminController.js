const User = require ('../models/user');
const Post = require('../models/post');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Get all users
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find({role : 'user'} , '_id name email role')

    res.status(200).json({
        success : true,
        users
    });
}) 


//Delete a user 
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler("Invalid request",404));
    }

    user.remove();

    res.status(200).json({
        success  : true
    })

})


//Get all posts

exports.getAllPosts = catchAsyncErrors(async(req,res,next)=>{
    const posts = await Post.find({});

    res.status(200).json({
        success : true,
        posts
    });
})



exports.deletePost = catchAsyncErrors(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post)
    {
        return next(new ErrorHandler("Invalid Request"));
    }

    post.remove();

    res.status(200).json({
        success:true 
    })
})