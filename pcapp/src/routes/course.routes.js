var express = require('express');
var router = express.Router();
const course = require('../controllers/course.controller.js');

// Create a new Note
router.post('/courses', course.create);

// Retrieve all Notes
router.get('/courses', course.findAll);

// Retrieve a single Note with noteId
router.get('/course/:courseId', course.findOne);

// Update a Note with noteId
router.put('/course/:courseId', course.update);

// Delete a Note with noteId
router.delete('/course/:courseId', course.delete);

module.exports = router;