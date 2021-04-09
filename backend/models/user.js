const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 Characters"],
        minLength: [1, "Invalid Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email is already signed up"],
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`,
            isAsync: false,
        },
    },
    username: {
        type: String,
        required: [true, "Please enter username"],
        unique: [true, "username already taken"],
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minLength: [6, "Password cannot be less than 6 Characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpire: {
        type: Date,
    },

    following: [{
        type: mongoose.ObjectId,
        default : []
       }],
    followers: [{
        type: mongoose.ObjectId,
        default : []

                
    }

    ],

    notifications: [
        {
            type: mongoose.ObjectId,
            default : []

            
        }
    ]
});

//Encrypting the password if is modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//Token Generating methods
userSchema.methods.getJwtToken = function () {
    var token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
    return token;
};

//Password Comparison Methods
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken);
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    console.log(this.resetPasswordToken);
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
