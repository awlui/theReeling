var request = require('request');

module.exports.account = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + res.locals.currentUser.id + "/review",
		method: "GET",
		json: {},
		qs: {
			mostRecent: true,
			limit: 1
		}
	};
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err, "Account Error");
		} else if (response.statusCode === 200) {
			if (body[0]) {
				res.render('account', {
					user: {
						recentReview: {
							poster: body[0].Movie.poster,
							title: body[0].Movie.title,

							reviewParagraph: body[0].reviewParagraph
						}
					}
				});
			} else {
				res.render('account');
			}
		} else {
			console.log(response.statusCode);
		}
	});
}

module.exports.addReviewForm = function(req, res, next) {
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

module.exports.addReview = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/movie/" + req.params.movieId + "/review",
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

module.exports.editReviewForm = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/review/" + req.params.reviewId,
		method: "GET",
		json: {}
	};
	request(requestOptions, function(err, response, review) {
		if (err) {
			console.log(err);
		} else if (response.statusCode === 200) {
			if (res.locals.currentUser && (review.userId === res.locals.currentUser.id)) {
				res.render('editReview', {
					review: {
						id: req.params.reviewId,
						movieId: review.Movie.id,
						title: review.Movie.title,
						poster: review.Movie.poster,
						reviewParagraph: review.reviewParagraph,
						summary: review.summary
					}
				});
			} else {
				res.render("4xx", {
					message: "You are not authorized",
					statusCode: 400
				});
			}
		} else if (response.statusCode === 400 || response.statusCode === 404) {
				res.render("4xx", {
					message: review.message,
					statusCode: response.statusCode
				});
	
		} else {
			res.send(response.statusCode);
		}
	});
}

module.exports.editReview = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/review/" + req.params.reviewId,
		method: "PUT",
		json: {
			reviewParagraph: req.body.reviewParagraph,
			summary: req.body.summary,
			userId: res.locals.currentUser.id || null
		}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err);
		} else if (response.statusCode === 200) {
			res.redirect('/reviews');
		} else if (response.statusCode === 400 || response.statusCode === 404) {
			res.render("4xx", {
				message: body.message,
				statusCode: response.statusCode
			});
		} else {
			next(new Error("Internal Service Error"));
		}
	});
}

module.exports.editProfileForm = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + res.locals.currentUser.id,
		json: {},
		method: "GET"
	};
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
		} else if (response.statusCode === 200) {
			res.render("editProfile", {

				user: body
			});
		} else if (response.statusCode === 404) {
			res.render("4xx", {
				message: body.message || "",
				statusCode: response.statusCode
			});
		} else {
			next(new Error("Internal Service Error"));
		}
	});
}


module.exports.editProfile = function(req, res) {
	console.log(req.body);
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + res.locals.currentUser.id,
		json: {
			movieOne: req.body.movieOne,
			movieTwo: req.body.movieTwo,
			movieThree: req.body.movieThree,
			biography: req.body.biography,
			image: req.user.image
		},
		method: "PUT"
	};
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
		} else if (response.statusCode === 200) {
			res.redirect('/account');
			return;
		} else if (response.statusCode === 404 || response.statusCode === 400) {
			res.render('4xx', {
				message: body.message || "",
				statusCode: response.statusCode
			});
		} else {
			next(new Error("Internal Service Error"));
		}
	});

}

module.exports.reviews = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + res.locals.currentUser.id + "/review",
		json: {},
		method: "GET",
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err);
		} else if (response.statusCode === 200) {
			res.render("reviews", {
				reviews: body
			});
		} else if (response.statusCode === 400) {
			res.render('4xx', {
				message: body.message || "",
				statusCode: response.statusCode
			});
		} else {
			next(new Error("Internal Service Error"));
		}
	});

}