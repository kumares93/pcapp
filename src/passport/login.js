var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user.model');
var log = require('../utils/log')(module);

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) { 
            // check in mongo if a user with username exists or not
            log.debug(`[HK] email password ${email}  ${password}`);
            User.findOne({ 'email' :  email }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        log.debug(`User Not Found with email ${email}`);
                        return done(null, false, 'User Not found.');                 
                    }
                    // User exists but wrong password, log the error 
                    /* if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }*/

                    user.authenticate(password, function(res){
                    // User and password both match, return user from done method
                    log.debug(`success response ${res}`);
                    return done(null, user);
                    }, function (err){
                        // which will be treated like success
                        if (err){
                            log.debug('[HK] Invalid Password');
                            return done(null, false, 'Invalid Password'); // redirect back to login page
                        }
                    });

                }
            );

        })
    );

}
