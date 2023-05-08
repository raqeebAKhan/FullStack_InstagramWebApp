const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    Photo: {
        type: String,
        
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
 
    verifytoken:{
        type: String,
    },

    followers: [{ type: ObjectId, ref: "USER" }],
    following: [{ type: ObjectId, ref: "USER" }]
})

mongoose.model("USER", userSchema)