const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);
