const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true, "first name is required"],
        trim: true,
        text: true
    },
    last_name:{
        type: String,
        trim: true,
        text: true
    },
    username:{
        type: String,
        required: [true, "username name is required"],
        trim: true,
        text: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "email name is required"],
        trim: true,
        text: true
    },
    password:{
        type: String,
        required: [true, "password name is required"],
    },
    picture:{
        type: String,
        // default: here paste defaul link to "noPicture" image from cloud
    },
    cover:{
        type: String,
    },
    gender:{
        type: String,
        required: [true, "gender name is required"],
        trim: true
    },
    bYear:{
     type:Number,
     required:true,
     trim:true
    },
    bMonth:{
        type:Number,
        required:true,
        trim:true
    },
    bDay:{
        type:Number,
        required:true,
        trim:true
    }

//TODO Let's setup the User Model 05:00
})


const User = mongoose.model("User", userSchema)