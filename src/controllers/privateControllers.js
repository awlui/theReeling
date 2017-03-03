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
	res.render("addReview", {
		movie: {
			title: "Spirited Away",
			poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",

		}
	});
}

module.exports.editReview = function(req, res) {
	res.render("editReview", {
		review: {
			title: "Spirited Away",
			poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
			reviewParagraph: "",
			summary: ""
		}
	});
}

module.exports.editProfile = function(req, res) {
	res.render("editProfile", {
		user: {
			biography: "the names andy",
			image: "profile.png",
			favorites: ["Spirited Away"]
		}
	});
}

module.exports.reviews = function(req, res) {
	res.render("reviews", {
		user: {
			reviews: [
			{
				title: "Spirited Away",
				poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
				id: 7,
				reviewParagraph: "not much of a review here"
			}]
		}
	});
}