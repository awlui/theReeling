var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

passport.use("login", new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/login/user",
		method: "GET",
		json: {},
		qs: {
			password: password,
			username: username
		},
	};
	request(requestOptions, function(err, response, user) {
		if (err) {
			next(err);
		}
		if (response.statusCode === 404 || response.statusCode === 400) {
			return done(null, false, {message: "Invalid User and/or password"});
		}
		return done(null, user, {message: "Login Successful, Welcome to the Reeling " + username});
	});
}));

module.exports = function() {

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
	// passport.serializeUser(function(user, done) {
	// 	done(null, user.id);
	// });
	// passport.deserializeUser(function(id, done) {
	// 	var requestOptions = {
	// 		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + id,
	// 		method: "GET"
	// 	};
	// 	request(requestOptions, function(err, response, user) {
	// 		if (err) {
	// 			console.log(err, false);
	// 		} else if (response.statusCode === 200) {
	// 			done(err, user);
	// 		} else {
	// 			done(response.statusCode, false);
	// 		}
	// 	});
	// });
}