const Post = require('../models/post');
const ErrorHandler = require('../utils/errorHandler')
const catchAyncErrors = require('../middlewares/catchAsyncErrors');


//Create Post
exports.createPost = catchAyncErrors(async(req,res,next)=>{
    const {title , content} = req.body;
    const post = await Post.create({title,content, user : req.user._id});
    post.save();
    res.status(200).json({
        success : true
    })
})


//Get all user posts
exports.getAllposts  = catchAyncErrors(async(req,res,next)=>{
    const posts = await Post.find({user : req.user._id});
    res.status(200).json({
        success  : true,
        posts
    }) 
})


exports.getSinglePost = catchAyncErrors(async(req,res,next)=>{
    const post  = await Post.findById(req.params.id).populate('user' , 'name');
    if(!post)
    {
        return next(new ErrorHandler("Invalid request" , 404))
    }

    res.status(200).json({
        success : true,
        post
    })

})

//Delete Post 
exports.deletePost = catchAyncErrors(async(req,res,next)=>{
    const post = await Post.findOne({_id : req.params.id , user : req.user.id});
    console.log(post);

    if(!post)
    {
        return(next(new ErrorHandler("No such post",404)))
    }

    await post.remove();

    res.status(200).json({
        success: true
    })
})

//Edit post
exports.updatePost = catchAyncErrors(async(req,res,next)=>{
    const udpatedData = {title : req.body.title  , content :  req.body.content}

    let post = await Post.findOne({_id : req.params.id , user : req.user.id});

    if(!post)
    {
        return(next(new ErrorHandler("No such post",404)))
    }

     post = await Post.findOneAndUpdate({_id : req.params.id}, udpatedData,
         {new : true ,
          runValidators: true ,
          useFindAndModify : false}
          );

    res.status(200).json({
        success:true
    })

})







