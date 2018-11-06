var express = require('express');
var router = express.Router();
const users = require('../controllers/user.controller.js');

// Create a new user
router.post('/users', users.create);

// Retrieve all users
router.get('/users', users.findAll);

// Retrieve a single user with userId
router.get('/user/:userId', users.findOne);

// Update a user with userId
router.put('/user/:userId', users.update);

// Delete a user with userId
router.delete('/user/:userId', users.delete);

module.exports = router;