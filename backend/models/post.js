const mongoose = require('mongoose');
const validator = require('validator');


const postSchema = new mongoose.Schema({
    title :{
        type : String,
        required : [true , "Please enter the title for the post"],
        maxLength : [10 , "Post title cannot exceed 10 characters"],
        minLength : [1 , "Invalid Title"]
    },
    content :{
        type : String,
        required : [true , ""],
        maxLength : [200 , "Post cannot exceed 200 characters"]
    },
    createdAt :{
        type : Date,
        default : Date.now()
    },
    /*
    likes :{
        [{}]
    }
    */
})