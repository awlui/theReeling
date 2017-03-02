module.exports.account = function(req, res) {
	res.render("account", {});
}

module.exports.addReview = function(req, res) {
	res.render("addReview", {});
}

module.exports.editReview = function(req, res) {
	res.render("editReview", {});
}

module.exports.editProfile = function(req, res) {
	res.render("editProfile", {});
}

module.exports.reviews = function(req, res) {
	res.render("profile", {});
}