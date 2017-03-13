module.exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
		return;
	} else {
		res.render('4xx', {
			message: "You are not authorized to view this page",
			statusCode: 400
		});
	}
}
