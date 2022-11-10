const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/do87gdwir/image/upload/v1668104857/icons8-avatar-64_igjgsy.png"
    },
    followers: [{type:ObjectId, ref: "User"}],
    following: [{type:ObjectId, ref: "User"}]
});

mongoose.model("User", userSchema);