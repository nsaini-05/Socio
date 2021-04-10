const Post = reuire('../models/post');
const ErrorHandler = require('../utils/errorHandler')
const catchAyncErrors = require('../middlewares/catchAsyncErrors');


//Create Post
exports.createPost = catchAyncErrors(async(req,res,next)=>{
    const {title , content} = req.body;
    const post = await Post.create({title,content,user : req.user._id});
    post.save();
    res.status(200).json({
        success : true
    })
})


//Delete Post 
exports.deletePost = catchAyncErrors(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);

    if(!post)
    {
        return(next(new ErrorHandler("No such post",404)))
    }

    await Post.remove();

    res.status(200).json({
        success: true
    })
})

//







