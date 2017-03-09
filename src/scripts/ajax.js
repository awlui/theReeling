$(function() {
	$('input[name="search"]', 'section.search').on('keyup', function() {
		$('div.row', 'section.searchResult').empty();
		if ($(this).val().length > 3) {
			$.getJSON('https://cryptic-oasis-17522.herokuapp.com/searchAPI', {
				search: $(this).val()
			}, function(data) {
				$('div.row', 'section.searchResult').empty();
				console.log(data);
				var $section, $link;
				var $root = $('div.row', 'section.searchResult');
				var count = 0;
				for (each in data.results) {
					if (data.results[each].poster_path === null) {
						continue;
					}
					(function(movie) {
							$section = $('<section class="desktop-c-4 tablet-c-6 mobile-c-12 postercontainer hvr-grow"></section>');
							$link = $('<a href="movieInfo/' + data.results[movie].id + '"></a>');
							$link.append('<img src=https://image.tmdb.org/t/p/w500' + data.results[movie].poster_path + '>');
							$section.append($link);
							$root.append($section.hide().fadeIn(500*count));
							count++;
					})(each);
				}
			});
		}
	});
});
