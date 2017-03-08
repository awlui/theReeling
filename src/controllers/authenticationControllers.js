var request = require('request');

module.exports.loginForm = function(req, res) {
	res.render('login', {});
}

module.exports.signUp = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user",
		method: "POST",
		json: {
			firstName: req.body.firstname,
			lastName: req.body.lastname,
			username: req.body.username,
			password: req.body.password
		}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err);
		} else if (response.statusCode === 201) {
			console.log(body, 'hello');
			next();
		} else {
			if (body.name === "SequelizeUniqueConstraintError") {
				res.statusCode = 400;
				res.send("Username is taken");
			}
			else {
				console.log(response.statusCode);
				next(response.statusCode);
			}
		}
	});
}

module.exports.logout = function(req, res) {
	req.logout();
	res.redirect("/");
}