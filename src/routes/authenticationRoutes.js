var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticationControllers = require('../controllers/authenticationControllers')


router.get('/login', authenticationControllers.loginForm);

router.post('/login', passport.authenticate("login", {
	successRedirect: '/account',
	failureRedirect: '/login',
	successFlash: true,
	failureFlash: true
}));

router.post('/signUp', authenticationControllers.signUp, 
	passport.authenticate("login", {
	successRedirect: '/account',
	failureRedirect: '/',
	failureFlash: true,
	successFlash: true
}));

router.get("/logout", authenticationControllers.logout);

module.exports = router;