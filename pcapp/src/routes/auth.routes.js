var express = require('express');
var router = express.Router();
var log = require('../utils/log')(module);
module.exports = function(passport){
  
  router.post('/login', function(req, res, next){
    log.debug('[Stated] executing login api');
    passport.authenticate('login', function(err,user,info){
        if (err) { return next(err); };
        res.send(user);
    })(req, res, next);

  });

  /* Handle Registration POST */
  router.post('/signup', function(req, res, next){
    passport.authenticate('signup', function(err,user,info){
        if (err) {
            console.log('[HK] error in signup', err); 
            return next(err); 
        };
        res.send(user);
    })(req, res, next);

  });


  /* Handle Login POST 
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true 
  }));
  
  GET Registration Page 
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });*/

  return router;
}

