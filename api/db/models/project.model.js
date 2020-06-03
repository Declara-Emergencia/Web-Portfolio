const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    thumbnail: { // Storing the path of an image file, there may be a better way to do this
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    source: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project }