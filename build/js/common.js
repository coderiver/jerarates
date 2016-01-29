$(document).ready(function() {

	// sidebar
	$('.js-sublink').click(function(e) {
		if($(this).parents('.is-collapsed').length > 0 && (!$(this).parents('.is-mobile').length > 0)) return;
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
		$(this).parents('.js-sidebar').toggleClass('is-collapsed is-clicked');
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

		// measureTablWidth();
	});
	$('.js-sublink').on('mouseover', function() {
		if($('.js-sidebar').hasClass('is-collapsed')) {
			$(this).parent().siblings().find('.js-sublink').removeClass('is-expanded');
			$(this).parent().siblings().find('.js-submenu').removeClass('is-active');
		} else return;
	});
	// scroll
	$('.js-scroll').each(function(){
	    $(this).perfectScrollbar();
	});

	// avoid double scroll in tables
		$('.js-vert-scroll').perfectScrollbar({
		suppressScrollX: true
	});

	// function measureTablWidth() {
		// $('.js-vert-scroll').each(function() {
		// 	var elParent = $(this).parent('.js-scroll');
		// 	$(this).width(elParent.find('.js-tabl-head').outerWidth());
		// });
	// }
	// measureTablWidth();

	// checkboxes in tabl
	$('.js-check input').on('change', function() {
		$(this).closest('tr').toggleClass('is-active');
	});

	// search-result
	$('.js-search-input').on('keyup', function() {
		var $parent = $(this).parents('.js-search'),
			$menu 	= $parent.find('.js-search-result'),
			val 	= $(this).val();

		if ( val.length >= 3 ) {
			$menu.addClass('is-open');
		} else if ( val.length < 3 ) {
			$menu.removeClass('is-open');
		}
	});

	function detectHeight() {
		$('.js-height').each(function() {
			var _ = $(this),
				position = _.offset().top,
				height = $(window).height() - position;

			if($(window).width() <= 767) {
				_.outerHeight('auto')
				  .css('max-height', 'auto');
				return;
			}

			if ( _.hasClass('js-vert-scroll') ) {
				_.css('max-height', height);
			} else {
				_.outerHeight(height);
			}

		});
	}

	detectHeight();

	$('.js-tabl-detail').click(function() {
		$(this).addClass('is-detail');
		$(this).siblings().removeClass('is-detail');

		if ( !$('.js-content .content-body').hasClass('is-sideinfo') ) {
			$('.js-content .content-body').addClass('is-sideinfo');
		}

		$('.js-sideinfo').addClass('is-active');

		// measureTablWidth();
	});

	$('.js-close').click(function() {
		$(this).parent().removeClass('is-active');
		$('.js-content .content-body').removeClass('is-sideinfo');
		$('.js-sideinfo').removeClass('is-active');

		// measureTablWidth();
	});
	$('.js-show-sidebar').on('click', function () {
		var $block = $('.' + $(this).data('sidebar')),
			$parent = $(this).parents('.js-content-action');

		$parent.toggleClass('is-open-sbar');
		$block.toggleClass('is-active');
		$(this).toggleClass('is-active');
	});
	// hide dropdown in collapsed in menu
	$('body').on('click', function(e) {
		if ( $('.js-sidebar').hasClass('is-collapsed') && $('.js-submenu').hasClass('is-active') && !$(e.target).parents('.js-collapse').length > 0) {
			$('.js-submenu').removeClass('is-active');
		}
	});
	function collapseSidebar() {
		if($(window).width() < 1023) {
			$('.js-sidebar').addClass('is-collapsed is-mobile');
			$('.js-content').addClass('is-expanded');
		} else if($(window).width() > 1023 && (!$('.js-sidebar').hasClass('is-clicked'))) {
			$('.js-sidebar').removeClass('is-collapsed is-mobile');
			$('.js-content').removeClass('is-expanded');
		}
	}
	collapseSidebar();

	$(window).resize(function() {
		// measureTablWidth();
		detectHeight();
		collapseSidebar();
		$('.js-scroll').perfectScrollbar('update');
	});
	$('.js-find').on('click', function() {

		$('.js-find-block').toggleClass('is-open');

	});
});
