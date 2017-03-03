module.exports.homepage = function(req, res) {
	res.render('index', {
		movies: [
		{
			"title": "Spirited Away",
			"poster": "http://fontmeme.com/images/USA_full-spirited-away-poster.jpg",
			"lgPoster": "https://images4.alphacoders.com/203/203996.jpg",
			"reviewSummary": "I first watched Spirited Away in the Sixth Grade and, even then, I knew there was something special about this movie...",
			"reviewer": "Andy Lui"


		},
		{
			"title": "Interstellar",
			"poster": "https://s-media-cache-ak0.pinimg.com/originals/a5/13/df/a513df413b50b1c5de6e2e98b54691d8.jpg",
			"lgPoster": "https://blurppy.files.wordpress.com/2014/05/screen-shot-2014-05-17-at-10-06-40-pm.png",
			"reviewSummary": "Directed by Christopher Nolan, Interstellar is a unique film that plays with time and space in a way that has never been done before in cinema. It is a science-motivated movie but also has a potent human element...",
			"reviewer": "Andy Lui"
		},
		{
			"title": "Howl's Moving Castle",
			"poster": "http://pre01.deviantart.net/47b3/th/pre/i/2016/062/0/7/spirit_of_the_demon___howl_s_moving_castle_poster_by_edwardjmoran-d9trrjf.jpg",
			"lgPoster": "https://images7.alphacoders.com/325/325547.jpg",
			"reviewSummary": "I watched Howl's Moving Castle a couple of years after Spirited Away, created by the same director, the masterful Hayao Miyazaki. I noticed immediately the magic imbued in the filmmaking yet there was something that distinguished it from its older sibling...",
			"reviewer": "Andy Lui"
		}
		]
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