var request = require('request');

module.exports.homepage = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/review/3",
		method: "GET",
		json: {}
	}
	request(requestOptions, function(err, response, body) {
		console.log(response.statusCode);
		res.render('index', {
			reviews: body
		});
	});
	// res.render('index', {
	// 	movies: [
	// 	{
	// 		title: "Spirited away",
	// 		poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
	// 		lgPoster: "https://images4.alphacoders.com/203/203996.jpg",
	// 		reviewSummary: "I first watched Spirited Away in the Sixth Grade and, even then, I knew there was something special about this movie...",
	// 		reviewer: "Andy Lui"


	// 	},
	// 	{
	// 		title: "Interstellar",
	// 		poster: "https://s-media-cache-ak0.pinimg.com/originals/a5/13/df/a513df413b50b1c5de6e2e98b54691d8.jpg",
	// 		lgPoster: "https://blurppy.files.wordpress.com/2014/05/screen-shot-2014-05-17-at-10-06-40-pm.png",
	// 		reviewSummary: "Directed by Christopher Nolan, Interstellar is a unique film that plays with time and space in a way that has never been done before in cinema. It is a science-motivated movie but also has a potent human element...",
	// 		reviewer: "Andy Lui"
	// 	},
	// 	{
	// 		title: "Howl's Moving Castle",
	// 		poster: "http://pre01.deviantart.net/47b3/th/pre/i/2016/062/0/7/spirit_of_the_demon___howl_s_moving_castle_poster_by_edwardjmoran-d9trrjf.jpg",
	// 		lgPoster: "https://images7.alphacoders.com/325/325547.jpg",
	// 		reviewSummary: "I watched Howl's Moving Castle a couple of years after Spirited Away, created by the same director, the masterful Hayao Miyazaki. I noticed immediately the magic imbued in the filmmaking yet there was something that distinguished it from its older sibling...",
	// 		reviewer: "Andy Lui"
	// 	}
	// 	]
	// });
}

module.exports.loginForm = function(req, res) {
	res.render('login', {});
}

module.exports.login = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/user/",
		method: "POST"
	}
}

module.exports.signUp = function(req, res, next) {
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
			console.log(err);
		} else if (response.statusCode === 201) {
			res.redirect('/account');
		} else {
			if (body.name === "SequelizeUniqueConstraintError") {
				res.statusCode = 400;
				res.send("Username is taken");
			}
			else {
				console.log(response.statusCode);
				next(response.statusCode);
			}
		}
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

module.exports.movieInfo = function(req, res) {
	var requestOptions = {
		url: "https://blooming-sea-71496.herokuapp.com/api/movie/" + req.params.movieId,
		method: "GET",
		json: {}
	}
	request(requestOptions, function(err, response, body) {
		var requestOptions;
		if (err) {
			console.log('error')
			console.log(err);
		} else if (response.statusCode === 200) {
			console.log(body);
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
					console.log(err);
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
							console.log(err);
						} else if (response.statusCode === 201) {
							res.redirect('/movieInfo/' + body.id);

						} else {
							console.log(response.statusCode)
						}
					});
				} else {
					console.log(response.statusCode);
				}
			})

		} else {
			console.log(response.statusCode)
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
		console.log(body);
		if (err) {
			console.log(err);
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
		} else {
			res.send(response.statusCode);
		}
	});
	// res.render('profile', {
	// 	user: {
	// 		name: "Andy Lui",
	// 		image: "profile.png",
	// 		biography: "Hi me name is Andy.",
	// 		favorites: ["Spirited Away","Interstellar", "Forrest Gump"],
	// 		reviews: [
	// 		{
	// 			poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
	// 			title: "Spirited Away",
	// 			reviewParagraph: "A fantastic movie"
	// 		}]

	// 	}
	// });
}