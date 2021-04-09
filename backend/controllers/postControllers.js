const Post = reuire('../models/post');
const ErrorHandler = require('../utils/errorHandler')
const catchAyncErrors = require('../middlewares/catchAsyncErrors');


//Create Post


exports.createPost = catchAyncErrors(async(req,res,next)=>{
    const post = await Post.create(req.body);
    post.save();
})



