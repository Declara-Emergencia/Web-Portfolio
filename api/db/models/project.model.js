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
        required: false,
        minlength: 1,
        trim: true
    },
    source: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    date: {
        type: Date,
        required: false
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('project', ProjectSchema, 'projects');
