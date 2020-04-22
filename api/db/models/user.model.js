const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    picture: { // Storing the path of an image file, there may be a better way to do this
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User }
