$(function() {
	$('.carousel').slick({
		// lazyLoad: 'ondemand',
		infinite: true,
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

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      // target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});