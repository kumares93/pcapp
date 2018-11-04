const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {

    // Create a User
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile
    });
    console.log('[HK] user>>', user);
    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(User);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.user) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find User and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.userId
        });
    });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};