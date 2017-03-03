module.exports.account = function(req, res) {
	res.render("account", {
		user: {
			recentReview: {
				poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
				title: "Spirited Away",
				reviewParagraph: "I first watch Spirited Away in the Sixth Grade and, even then, I knew there was something special about this movie..."
			}
		}
	});
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