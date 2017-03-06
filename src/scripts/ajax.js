$('input[name="search"]', 'section.search').on('keyup', function() {
	if ($(this).val().length > 3) {
		$.getJSON('https://cryptic-oasis-17522.herokuapp.com/searchAPI', {
			search: $(this).val()
		}, function(data) {
			$root = $('section.searchResult div.row');
			for (each in data.results) {
				var $new = $('section.desktop-c-4.tablet-c-6.mobile-c-12.posterContainer.hvr-grow');
				$root.append($new);
			}
		})
	}
});

// section.desktop-c-4.tablet-c-6.mobile-c-12.posterContainer.hvr-grow
//   a(href="movieInfo/"+movie.title)
//     img(src=movie.poster)