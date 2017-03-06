$('input[name="search"]', 'section.search').on('keyup', function() {
	if ($(this).val().length > 3) {
		$.getJSON('https://blooming-sea-71496.herokuapp.com/searchAPI', {
			search: $(this).val()
		}, function(data) {
			console.log(data.results[0].title)
		})
	}
});