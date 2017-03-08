var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

passport.use("login", new LocalStrategy(function(username, password, done) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/login/user/" + username,
		method: "GET",
		json: {},
		qs: {
			password: password
		}
	};
	console.log(username, password)
	request(requestOptions, function(err, response, user) {
		console.log(user);
		if (err) {
			console.log(err);
		}
		if (!user) {
			console.log("NO user");
		}
		if (response.statusCode === 404) {
			return done(null, false, {message: "invalid password"});
		} else if (response.statusCode === 400) {
			return done(null, false, {message: "User not found"});
		}
		return done(null, user);
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