const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type :  String,
        required : [ , "Please enter your name"],
        maxLength : [30 , "Your name cannot exceed 30 Characters"],
        minLength  : [1 , "Invalid Name"]
    },
    email:{
        type : String,
        required : [true , 'Please enter your email'],
        unique :  [true , 'Email is already signed up'],
        validate : {
            validator : validator.isEmail,
            message : `{VALUE} is not a valid email`,
            isAsync : false
        }
    },
    password : {
        type : String,
        required : [true , "Please enter the password"],
        minLength : [6 , "Password cannot be less than 6 Characters"],
        select : false
    },
    avatar : {
        public_id:{
            type : String,
            required : true
        },
        url:{
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : 'user'
    },
    createdAt  : {
        type : Date,
        default : Date.now()
    },
    resetPasswordToken :{
        type : String
    },
    resetPasswordTokenExpire: {
        type : Date
    },

    following : [ {
        type: mongoose.Schema.ObjectId,
        ref: this,
        required: true
   }],
   followers : [ {
    type: mongoose.Schema.ObjectId,
    ref: this,
    required: true
}]

})


const User = mongoose.model('User' , userSchema);

module.exports = User;