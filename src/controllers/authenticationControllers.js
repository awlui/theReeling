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
	return;
}

module.exports.signUp = function(req, res, next) {
	if (!validateUserInfo(req.body.firstname, req.body.lastname, req.body.username, req.body.password)) {
		req.flash('error', 'You must complete all fields.')
		res.redirect("/#signUp");
		return;
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
			next(err);
			return;
		} else if (response.statusCode === 201) {
			req.flash("success", "Successfully Signed Up, Welcome to the Reeling!")
			next();
			return;
		} else if (response.statusCode === 400) {
			req.flash("error", "Username Taken!")
			res.redirect("/#signUp");
			return;
		} else {
			next(new Error("Internal Service Error"));
			return;
		}
	});
}

module.exports.logout = function(req, res) {
	req.logout();
	req.flash('success', 'You have successfully logged out');
	res.redirect("/");
	return;
}