var request = require('request');

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

module.exports.addReviewForm = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/movie/" + req.params.movieId,
		method: "GET",
		json: {}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err);

		} else if (response.statusCode === 200) {
			res.render('addReview', {
				movie: body
			});
		} else {
			console.log(response.statusCode);
		}
	});
}

module.exports.addReview = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/movie/" + req.params.movieId + "/review/" + res.locals.currentUser.id,
		method: "POST",
		json: {
			userId: res.locals.currentUser.id,
			movieId: req.params.movieId,
			reviewParagraph: req.body.reviewParagraph,
			summary: req.body.summary
		}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err);
			console.log('fail');
		} else if (response.statusCode === 201) {
			console.log('success')
			res.redirect("/movieInfo/" + req.params.movieId);
		} else {
			console.log(response.statusCode, "fail");
		}
	})
}

module.exports.editReviewForm = function(req, res) {
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