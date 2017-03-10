var movieSearch = function() {
		if ($(this).val().length > 3) {
			$.getJSON('https://cryptic-oasis-17522.herokuapp.com/searchAPI', {
				search: $(this).val()
			}, function(data) {
				$('div.row', 'section.searchResult').empty();
				var $section, $link;
				var $root = $('div.row', 'section.searchResult');
				data.results.forEach(function(val, index) {
					if (!val.poster_path) {
						return;
					}
					$section = $('<section class="desktop-c-4 tablet-c-6 mobile-c-12 movieSearch hvr-grow"></section>');
					$link = $('<a href="movieInfo/' + val.id + '"></a>');
					$link.append('<img src=https://image.tmdb.org/t/p/w500' + val.poster_path + '>');
					$section.append($link);
					$root.append($section.hide().fadeIn(500*index));				
				});
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
			data.forEach(function(val, index) {
				if (!val.image) {
					console.log(val.image)
					val.image = "http://cdn.techgyd.com/no-user-profile-picture-whatsapp.jpg";
				} else {
					val.image = "/public/uploads/" + val.image; 
				}
				$row = $('<div class="row"></div>');
				$section = $('<section class="mobile-c-12 userSearch"></section>');
				$imageWrapper = $('<section class="mobile-c-12 tablet-c-12 desktop-c-6  hvr-grow"></section>');
				$biographyWrapper = $('<section class="mobile-c-12 desktop-c-6"></section>');
				$username = $('<h2></h2>').append(val.username);
				$biography = $('<p></p>').append(val.biography || "No Biography");
				$biographyWrapper.append($username).append($biography);
				$link = $('<a href="/profile/' + val.id + '"></a>');
				$link.append('<img src=' + val.image + '>');
				$imageWrapper.append($link);
				$section.append($imageWrapper).append($biographyWrapper);
				$row.append($section);
				$root.append($row.hide().fadeIn(500*index));		
			});
		});
		

}
$(function() {
		$('input[name="search"]').on('keyup', movieSearch).trigger('keyup');
		$('input[type="checkbox"]').on('change', function() {
			if (this.checked) {
				$('div.row', 'section.searchResult').empty();
				$('input[name="search"]').off('keyup', movieSearch).on('keyup', userSearch).attr("placeholder", "Username").trigger('keyup');
			} else {
				$('div.row', 'section.searchResult').empty();
				$('input[name="search"]').off('keyup', userSearch).on('keyup', movieSearch).attr("placeholder", "Movie").trigger('keyup');
			}
		});
});
