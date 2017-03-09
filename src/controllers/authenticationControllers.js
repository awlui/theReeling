var request = require('request');

//Helper
function validateUserInfo(first,last,username,password) {
	 var args = Array.prototype.slice.call(arguments);
	 for (each in args) {
	 	if (args[each] === "") {
	 		return false;
	 	}
	 }
	 return true;
}

//Controllers
module.exports.loginForm = function(req, res) {
	res.render('login', {});
}

module.exports.signUp = function(req, res, next) {
	if (!validateUserInfo(req.body.firstname, req.body.lastname, req.body.username, req.body.password)) {
		res.redirect("/#signUp");
	} 
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
			next();
		} else {
			if (body.name === "SequelizeUniqueConstraintError") {
				res.statusCode = 400;
				res.send("Username is taken");
			}
			else {
				next(response.statusCode);
			}
		}
	});
}

module.exports.logout = function(req, res) {
	req.logout();
	res.redirect("/");
}