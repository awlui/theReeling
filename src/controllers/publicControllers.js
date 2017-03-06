var request = require('request');

module.exports.homepage = function(req, res) {
	res.render('index', {
		movies: [
		{
			title: "Spirited away",
			poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
			lgPoster: "https://images4.alphacoders.com/203/203996.jpg",
			reviewSummary: "I first watched Spirited Away in the Sixth Grade and, even then, I knew there was something special about this movie...",
			reviewer: "Andy Lui"


		},
		{
			title: "Interstellar",
			poster: "https://s-media-cache-ak0.pinimg.com/originals/a5/13/df/a513df413b50b1c5de6e2e98b54691d8.jpg",
			lgPoster: "https://blurppy.files.wordpress.com/2014/05/screen-shot-2014-05-17-at-10-06-40-pm.png",
			reviewSummary: "Directed by Christopher Nolan, Interstellar is a unique film that plays with time and space in a way that has never been done before in cinema. It is a science-motivated movie but also has a potent human element...",
			reviewer: "Andy Lui"
		},
		{
			title: "Howl's Moving Castle",
			poster: "http://pre01.deviantart.net/47b3/th/pre/i/2016/062/0/7/spirit_of_the_demon___howl_s_moving_castle_poster_by_edwardjmoran-d9trrjf.jpg",
			lgPoster: "https://images7.alphacoders.com/325/325547.jpg",
			reviewSummary: "I watched Howl's Moving Castle a couple of years after Spirited Away, created by the same director, the masterful Hayao Miyazaki. I noticed immediately the magic imbued in the filmmaking yet there was something that distinguished it from its older sibling...",
			reviewer: "Andy Lui"
		}
		]
	});
}

module.exports.login = function(req, res) {
	res.render('login', {});
}

module.exports.search = function(req, res) {
	res.render('search', {
		movies: [{
			title: "Spirited Away",
			poster: "http://image.tmdb.org/t/p/w500/ynXoOxmDHNQ4UAy0oU6avW71HVW.jpg"
		},
		{
			title: "Interstellar",
			poster: "https://s-media-cache-ak0.pinimg.com/originals/a5/13/df/a513df413b50b1c5de6e2e98b54691d8.jpg"
		},
		{
			title: "Howl's Moving Castle",
			poster: "http://pre01.deviantart.net/47b3/th/pre/i/2016/062/0/7/spirit_of_the_demon___howl_s_moving_castle_poster_by_edwardjmoran-d9trrjf.jpg"
		},
				{
			title: "Howl's Moving Castle",
			poster: "http://pre01.deviantart.net/47b3/th/pre/i/2016/062/0/7/spirit_of_the_demon___howl_s_moving_castle_poster_by_edwardjmoran-d9trrjf.jpg"
		}
		]
	});
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

	res.render('movieInfo', {
		movie: {
			poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
			lgPoster: "https://images4.alphacoders.com/203/203996.jpg",
			summary: "Spirited Away is an Oscar winning Japanese animated film about a ten year old girl who wanders away from her parents along a path that leads to a world ruled by strange and unusual monster-like animals. Her parents have been changed into pigs along with others inside a bathhouse full of these creatures. Will she ever see the world how it once was?",
			rating: "8.2",
			releaseDate: "2001-07-20",
			reviews: [
			{
				reviewParagraph: "Spirited away wisks you away to a magical world and teaches us as, filmgoers, that movies don't have to transition from action to action sequence to be filled with excitement. Also, this animated film shows us that human emotion can very well be portrayed on canvas.",
				reviewer: "Andy Lui",
				image: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/c0.26.320.320/p320x320/12814222_1208226805873810_6036424718898254150_n.jpg?oh=896921eef3a6e3ef2a12cd1bdd5b9cab&oe=59258F5B"
			}]
		}
	});
}

module.exports.profile = function(req, res) {
	res.render('profile', {
		user: {
			name: "Andy Lui",
			image: "profile.png",
			biography: "Hi me name is Andy.",
			favorites: ["Spirited Away","Interstellar", "Forrest Gump"],
			reviews: [
			{
				poster: "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
				title: "Spirited Away",
				reviewParagraph: "A fantastic movie"
			}]

		}
	});
}