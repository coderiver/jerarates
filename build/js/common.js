$(document).ready(function() {

	// sidebar
	$('.js-sublink').click(function(e) {
		$(this).toggleClass('is-expanded');
		$(this).parent().siblings().find('.js-sublink').removeClass('is-expanded');
		$(this).parent().siblings().find('.js-submenu').removeClass('is-active');
		$(this).parent().find('.js-submenu').toggleClass('is-active');
		return false;
	});

	$('.dropdown-menu').on('click', function(e) {
		e.stopPropagation();
	});

	// collapse sidebar
	$('.js-collapse').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('is-collapsed');
		$(this).parents('.js-sidebar').toggleClass('is-collapsed');
		$('.js-content').toggleClass('is-expanded');

		if ( $('.js-scroll').length > 0 ) {
			$('.js-scroll').perfectScrollbar('update');
		}

		if ( $(this).hasClass('is-collapsed') ) {
			setTimeout(function() {
				$('.js-collapse').parent().perfectScrollbar('destroy');
			}, 0);
		} else {
			setTimeout(function() {
				$('.js-collapse').parent().perfectScrollbar({ wheelPropagation: true });
			}, 0);
		}

		measureTablWidth();
	});

	// scroll
	$('.js-scroll').perfectScrollbar();

	// avoid double scroll in tables
	$('.js-vert-scroll').perfectScrollbar({
		suppressScrollX: true
	});

	function measureTablWidth() {
		$('.js-vert-scroll').each(function() {
			var elParent = $(this).parent('.js-scroll');
			$(this).width(elParent.find('.js-tabl-head').outerWidth());
		});
	}
	measureTablWidth();

	// checkboxes in tabl
	$('.js-check input').on('change', function() {
		$(this).closest('tr').toggleClass('is-active');
	});

	// search-result
	$('.js-search-input').on('keyup', function() {
		var $parent = $(this).parents('.js-search'),
			$menu 	= $parent.find('.js-search-result'),
			val 	= $(this).val();

		if(val.length >= 3) {
			$menu.addClass('is-open');
		}
		else if(val.length < 3) {
			$menu.removeClass('is-open');
		}
	});

	// hide dropdown in collapsed in menu
	$('body').on('click', function(e) {
		if ( $('.js-sidebar').hasClass('is-collapsed') && $('.js-submenu').hasClass('is-active') && !$(e.target).parents('.js-collapse').length > 0) {
			$('.js-submenu').removeClass('is-active');
		}
	});

	$(window).resize(function() {
		measureTablWidth();
	});
});