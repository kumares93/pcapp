const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    topics: [{
        topicId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        videoId: {
            type: String,
            required: true
        },
        videoURL: {
            type: String,
            required: true
        },
        editor: {
            id: String,
            code: String,
        },
        projectUrl: String,
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);
