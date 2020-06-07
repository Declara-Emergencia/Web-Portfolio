const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlenght: 1,
        trim: false
    },
    password: {
        type: String,
        required: true,
        minlenght: 7,
        trim: false
    },
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
        required: false,
        minlength: 1,
        trim: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('user', userSchema, 'users');
