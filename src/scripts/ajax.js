var movieSearch = function() {
		if ($(this).val().length > 3) {
			$.getJSON('https://cryptic-oasis-17522.herokuapp.com/searchAPI', {
				search: $(this).val()
			}, function(data) {
				$('div.row', 'section.searchResult').empty();
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
};
var userSearch = function() {
		$.getJSON("https://blooming-sea-71496.herokuapp.com/api/user", {
			search: $(this).val()
		}, function(data) {
			$('div.row', 'section.searchResult').empty();
			var $section, $link;
			var $root = $('div.row', 'section.searchResult');
			var count = 0;
			console.log(data);
			for (each in data) {
				console.log(data[each], "HERE");
				(function(user) {
					$section = $('<section class="desktop-c-4 tablet-c-6 mobile-c-12 postercontainer hvr-grow"></section>');
					$link = $('<a href="/profile/' + data[user].id + '"></a>');
					$link.append('<img src="/public/uploads/' + data[user].image + '">');
					$section.append($link);
					$root.append($section.hide().fadeIn(500*count));
					count++;
				})(each);
			}

		});
		

}
$(function() {
		$('input[name="search"]').on('keyup', movieSearch);
		$('input[type="checkbox"]').on('change', function() {
			if (this.checked) {
				$('div.row', 'section.searchResult').empty();
				$('input[name="search"]').off('keyup', movieSearch).on('keyup', userSearch).attr("placeholder", "Username");
			} else {
				$('div.row', 'section.searchResult').empty();
				$('input[name="search"]').off('keyup', userSearch).on('keyup', movieSearch).attr("placeholder", "Movie");
			}
		});
});
