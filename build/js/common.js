$(document).ready(function() {

	// sidebar
	$('.js-sublink').click(function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-expanded') ) {
			$(this).addClass('is-expanded');
			$(this).parent().siblings().find('.js-sublink').removeClass('is-expanded');
			$(this).parent().siblings().find('.js-submenu').slideUp();
			$(this).parent().find('.js-submenu').slideDown();
		}

	});

});