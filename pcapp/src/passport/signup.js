var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user.model');
var log = require('../utils/log')(module);

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            log.debug(`[HK] signup>> ${email} ${password}`);
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'email' :  email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        log.debug(`Error in SignUp: ${err}`);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        log.debug(`User already exists with email: ${email}`);
                        return done(null, false, 'User Already Exists');
                    } else {
                        // if there is no user with that email
                        // create the user
                        const newUser = new User({
                            username: req.body.username,
                            password: req.body.password,
                            email: req.body.email,
                            mobile: req.body.mobile
                        });

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                log.debug(`Error in Saving user: ${err}`);  
                                throw err;  
                            }
                            log.debug('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
}
