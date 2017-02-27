$(function() {
	$('.carousel').slick({
		// lazyLoad: 'ondemand',
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true
	}); 
});

$(function() {
	$(window).on('resize', function(evt) {
		$('img', '.carousel').each(function() {
			var $this = $(this);
		if ($(window).width() < 700) {
			if ($this.data('poster')) {
				$this.attr('src', $this.data('poster'));
			}
		} else {
			if ($this.data('default')) {
			$this.attr('src', $this.data('default'));
			}
		}
	});
	});
	$(window).resize();
});
