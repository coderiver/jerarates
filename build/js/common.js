$(document).ready(function() {

	// sidebar
	$('.js-sublink').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('is-expanded');
		$(this).parent().siblings().find('.js-sublink').removeClass('is-expanded');
		$(this).parent().siblings().find('.js-submenu').removeClass('is-active');
		$(this).parent().find('.js-submenu').toggleClass('is-active');
	});

	$('.dropdown-menu').on('click', function(e) {
		e.stopPropagation();
	});

	// collapse sidebar
	$('.js-collapse').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('is-collapsed');
		$(this).parents('.js-sidebar').toggleClass('is-collapsed');

		if ( $(this).hasClass('is-collapsed') ) {
			setTimeout(function() {
				$('.js-collapse').parent().perfectScrollbar('destroy');
			}, 0);
		} else {
			setTimeout(function() {
				$('.js-collapse').parent().perfectScrollbar({ wheelPropagation: true });
			}, 0);
		}

	});

	// vertical scroll
	$('.js-vert-scroll').perfectScrollbar({
		wheelPropagation: true
	});

});