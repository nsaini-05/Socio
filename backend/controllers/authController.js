const User = require('../models/user');


exports.registerUser = async(req,res,next) =>{

    try{
    const user  = await User.create(req.body);

    res.status(201).json({
        success: true,
        user
    }) 
    }
    catch(error)
    {
        console.log(error.message)
    }   
}