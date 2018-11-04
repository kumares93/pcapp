const Course = require('../models/course.model.js');

// Create and Save a new Course.
exports.create = (req, res) => {
    // Validate request
    if(!req.body.courseId && !req.body.name && !req.body.topics) {
        return res.status(400).send({
            message: "Course id, name and topics can not be empty."
        });
    }

    // Create a Course
    const course = new Course({
        courseId: req.body.courseId,
        courseName: req.body.name,
        description: req.body.description,
        topics: req.body.topics
    });

    // Save Course in the database
    course.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Course."
        });
    });
};

// Retrieve and return all Courses from the database.
exports.findAll = (req, res) => {
    Course.find()
    .then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Courses."
        });
    });
};

// Find a single Course with a courseId
exports.findOne = (req, res) => {
    Course.findOne({"courseId":req.params.courseId})
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });            
        }
        res.send(course);
    }).catch(err => {
        console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Course with id " + req.params.courseId
        });
    });
};

// Update a Course identified by the CourseId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.courseId && !req.body.name && !req.body.topics) {
        return res.status(400).send({
            message: "Course content can not be empty"
        });
    }

    // Find Course and update it with the request body
    Course.findByIdAndUpdate(req.params.courseId, {
        courseId: req.body.courseId,
        courseName: req.body.name,
        description: req.body.description,
        topics: req.body.topics
    }, {new: true})
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Error updating Course with id " + req.params.courseId
        });
    });
};

// Delete a course with the specified courseId in the request
exports.delete = (req, res) => {
    Course.findByIdAndRemove(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });
        }
        res.send({message: "Course deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Course with id " + req.params.courseId
        });
    });
};
