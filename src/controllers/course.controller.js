const Course = require('../models/course.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const course = new Course({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    course.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Course.find()
    .then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Course.findById(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.courseId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.courseId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Course.findByIdAndUpdate(req.params.courseId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.courseId
            });
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.courseId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Course.findByIdAndRemove(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.courseId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.courseId
        });
    });
};