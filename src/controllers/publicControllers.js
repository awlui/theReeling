module.exports.homepage = function(req, res) {
	res.render('index', {
		
	});
}

module.exports.login = function(req, res) {
	res.render('login', {});
}

module.exports.search = function(req, res) {
	res.render('search', {});
}

module.exports.movieInfo = function(req, res) {
	res.render('movieInfo', {});
}

module.exports.profile = function(req, res) {
	res.render('profile', {});
}