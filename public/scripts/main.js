$(function() {
	$('.carousel').slick({
		autoplay: true,
		speed: 500,
		autoplaySpeed: 2000,
		dots: true,
		responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 699,
			settings: {
				slidesToScroll: 1,
				slidesToShow: 1,
				infinite: true,
			}
		}
		]
	}); 
});