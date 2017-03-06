$('input[name="search"]', 'section.search').on('keyup', function() {
	if ($(this).val().length > 3) {
		$.getJSON('http://localhost:3000/searchAPI', {
			search: $(this).val()
		}, function(data) {
			console.log(data.results[0].title)
		})
	}
});