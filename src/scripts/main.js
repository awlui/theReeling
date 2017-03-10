// Slick Options

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


// Image swap at 700 width breakpoint on the carousel and other banners
$(function() {
	$(window).on('resize', function(evt) {
		$('img', '.carousel, .backdrop').each(function() {
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


// Smooth Scroll Down Effect
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

