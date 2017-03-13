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
			next(err);
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
				return;
			} else {
				res.render('account');
				return;
			}
		} else {
			next(new Error("Internal Service Error"));
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
			next(err);
			return;
		} else if (response.statusCode === 200) {
			res.render('addReview', {
				movie: body
			});
			return;
		} else if (response.statusCode === 400 || response.statusCode === 404) {
			res.render('4xx', {
				message: body.message,
				statusCode: response.statusCode
			});
			return;
		} else {
			next(new Error("Internal Service Error"));
			return;
		}
	});
}

module.exports.addReview = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/movie/" + req.params.movieId + "/review",
		method: "POST",
		json: {
			userId: req.sanitize(res.locals.currentUser.id),
			movieId: req.sanitize(req.params.movieId),
			reviewParagraph: req.sanitize(req.body.reviewParagraph),
			summary: req.sanitize(req.body.summary)
		}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
			return;
		} else if (response.statusCode === 201) {
			req.flash("success", "Review Added");
			res.redirect("/movieInfo/" + req.params.movieId + "/#reviews");
			return;
		} else if (response.statusCode === 400 || response.statusCode === 404) {
			res.render('4xx', {
				message: body.message,
				statusCode: response.statusCode
			});
			return;
		} else {
			next(new Error("Internal Service Error"));
			return;
		}
	});
}

module.exports.editReviewForm = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/review/" + req.params.reviewId,
		method: "GET",
		json: {}
	};
	request(requestOptions, function(err, response, review) {
		if (err) {
			next(err);
			return;
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
				return;
			} else {
				res.render("4xx", {
					message: "You are not authorized",
					statusCode: 400
				});
				return;
			}
		} else if (response.statusCode === 400 || response.statusCode === 404) {
				res.render("4xx", {
					message: review.message,
					statusCode: response.statusCode
				});
				return;
		} else {
			next(new Error("Internal Service Error"));
		}
	});
}

module.exports.editReview = function(req, res, next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/review/" + req.params.reviewId,
		method: "PUT",
		json: {
			reviewParagraph: req.sanitize(req.body.reviewParagraph),
			summary: req.sanitize(req.body.summary),
			userId: req.sanitize(res.locals.currentUser.id) || null
		}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
		} else if (response.statusCode === 200) {
			req.flash("success", "Review Updated");
			res.redirect('/reviews');
			return;
		} else if (response.statusCode === 400 || response.statusCode === 404) {
			res.render("4xx", {
				message: body.message,
				statusCode: response.statusCode
			});
			return;
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
			return;
		} else if (response.statusCode === 200) {
			res.render("editProfile", {

				user: body
			});
			return;
		} else if (response.statusCode === 404) {
			res.render("4xx", {
				message: body.message || "",
				statusCode: response.statusCode
			});
			return;
		} else {
			next(new Error("Internal Service Error"));
		}
	});
}


module.exports.editProfile = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + res.locals.currentUser.id,
		json: {
			movieOne: req.sanitize(req.body.movieOne),
			movieTwo: req.sanitize(req.body.movieTwo),
			movieThree: req.sanitize(req.body.movieThree),
			biography: req.sanitize(req.body.biography),
			image: req.sanitize(req.user.image)
		},
		method: "PUT"
	};
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
		} else if (response.statusCode === 200) {
			req.flash("success", "Profile Updated");
			res.redirect('/account');
			return;
		} else if (response.statusCode === 404 || response.statusCode === 400) {
			res.render('4xx', {
				message: body.message || "",
				statusCode: response.statusCode
			});
			return;
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
			next(err);
			return;
		} else if (response.statusCode === 200) {
			res.render("reviews", {
				reviews: body
			});
			return;
		} else if (response.statusCode === 400) {
			res.render('4xx', {
				message: body.message || "",
				statusCode: response.statusCode
			});
			return;
		} else {
			next(new Error("Internal Service Error"));
			return;
		}
	});

}

// module.exports.deleteUser = function(req,res,next) {
// 	res.send(404)
// }

module.exports.deleteReview = function(req,res,next) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + res.locals.currentUser.id + "/review/" + req.params.reviewId,
		method: "DELETE",
		json: {}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
			return;
		} else if (response.statusCode === 204) {
			req.flash("error", "Review Deleted!")
			res.redirect('/account');
			return;
		} else if (response.statusCode === 400 || response.statusCode === 404) {
			res.render('4xx', {
				message: body.message || "",
				statusCode: response.statusCode
			});
			return;
		} else {
			next(new Error("Internal Service Error"));
		}
	});
}