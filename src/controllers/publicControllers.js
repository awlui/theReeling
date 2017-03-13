var request = require('request');

module.exports.homepage = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/review",
		qs: {
			limit: 4
		},
		method: "GET",
		json: {}
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
		}
		res.render('index', {
			reviews: body
		});
		return;
	});

}




module.exports.search = function(req, res) {
	res.render('search');
}

module.exports.searchAPI = function(req, res) {
	var query = req.query.search;
	var requestOptions = {
		url: "https://api.themoviedb.org/3/search/movie",
		method: "GET",
		json: {},
		qs: {
			query: query,
			api_key: "092a9f1d719e99b224ddc5fcde8ddaba"
		}
	};
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err);
		} else if (res.statusCode === 200) {
			res.send(body);
		} else {
			console.log(res.statusCode);
		}
	});
}


//Gets movie info existing in the RESTful api's database. If movie doesn't exist in database, controller performs get request to MovieDB api and then caches
//the movie in database. This is a callback mess that I will fix with promises once I get some test code up.
module.exports.movieInfo = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/movie/" + req.params.movieId,
		method: "GET",
		json: {}
	}
	request(requestOptions, function(err, response, body) {
		var requestOptions;
		if (err) {
			next(err);
			return;
		} else if (response.statusCode === 200) {
			res.render('movieInfo', {
				movie: {
					poster: body.poster,
					banner: body.banner,
					summary: body.summary,
					rating: body.rating,
					title: body.title,
					releaseDate: body.releaseDate,
					reviews: body.reviews,
					id: body.id
				}
			});
		} else if (response.statusCode === 404) {
			requestOptions = {
				url: "https://api.themoviedb.org/3/movie/" + req.params.movieId,
				method: "GET",
				json: {},
				qs: {
					api_key: "092a9f1d719e99b224ddc5fcde8ddaba"
				}
			}
			request(requestOptions, function(err, response, body) {
				var requestOptions;
				if (err) {
					next(err);
				} else if (response.statusCode === 200) {
					requestOptions = {
						url: "https://blooming-sea-71496.herokuapp.com/api/movie/" + req.params.movieId,
						method: "POST",
						json: {
							poster: body.poster_path,
							banner: body.backdrop_path,
							summary: body.overview,
							rating: body.vote_average,
							releaseDate: body.release_date,
							title: body.title
						},
					}
					request(requestOptions, function(err, response, body) {
						if (err) {
							next(err)
						} else if (response.statusCode === 201) {
							res.redirect('/movieInfo/' + body.id);

						} else {
							next(new Error("Internal Service Error"));
						}
					});
				} else {
					next(new Error("Internal Service Error"));
				}
			})

		} else {
			next(new Error("Internal Service Error"));
		}
	});
}

module.exports.profile = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/" + req.params.userId,
		method: "GET",
		json: {}
	};
	request(requestOptions, function(err, response, body) {
		if (err) {
			next(err);
		} else if (response.statusCode === 200) {
			res.render('profile', {
				user: {
					name: body.firstName + " " + body.lastName,
					image: body.image,
					biography: body.biography,
					favorites: body.favorites,
					reviews: body.reviews
				}
			});
		} else if (response.statusCode === 400 || response.statusCode === 404) {
			res.render('4xx', {
				message: body.message || "",
				statusCode: response.statusCode
			});
		} else {
			next(new Error("Internal Service Error"));
		}
	});
}