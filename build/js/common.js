$(document).ready(function() {

	//sidebar functionality
	(function() {
		var sidebar = {
			init: function() {
				this.dom();
				this.bindEvent();
			},
			dom: function() {
				this.block			= $('.js-sidebar');
				this.sublink 		= this.block.find('.js-sublink');
				this.submenu 		= this.block.find('.js-submenu');
				this.collapseBtn 	= this.block.find('.js-collapse');
			},
			bindEvent: function() {
				this.collapseBtn.on('click', this.collapseMenu.bind(this));
				this.sublink.on('click', this.openSubMenu.bind(this));
				$(window).on('resize', this.collapseMenuOnMobile.bind(this));
			},
			collapseMenuOnMobile: function() {
				if($(window).width() < 1023) {
					this.block.addClass('is-collapsed is-mobile');
					this.sublink.removeClass('is-expanded');
					this.submenu.removeClass('is-active');
					this.submenu.hide();
					$('.js-content').addClass('is-expanded');
					sidebar.shouldCheck = true;
				} else if($(window).width() > 1023 && (!$('.js-sidebar').hasClass('is-clicked'))) {
					this.block.removeClass('is-collapsed is-mobile');
					$('.js-content').removeClass('is-expanded');
					if(sidebar.shouldCheck) {
						this.showLast();
						sidebar.shouldCheck = false;
					}

				}
			},
			showLast: function() {
				if(!this.block.hasClass('is-collapsed')) {
					//console.log(sidebar.lastItem);
					var blockToSHow = this.block.find('.sidebar__list > li').eq(sidebar.lastItem);
					var blockToSHowLink = blockToSHow.find('.js-sublink');
					var blockToSHowMenu = blockToSHow.find('.js-submenu');
					blockToSHowLink.addClass('is-expanded');
					blockToSHowMenu.addClass('is-active');
					blockToSHowMenu.show();
				}
			},
			collapseMenu: function() {
				this.sublink.removeClass('is-expanded');
				this.submenu.removeClass('is-active');
				this.submenu.hide();
				this.collapseBtn.toggleClass('is-collapsed');
				this.block.toggleClass('is-collapsed is-clicked');
				$('.js-content').toggleClass('is-expanded');

				this.showLast();

				if ( $('.js-scroll').length > 0 ) {
					$('.js-scroll').perfectScrollbar('update');
				}
				if ( this.block.hasClass('is-collapsed') ) {
					setTimeout(function() {
						$('.js-collapse').parent().perfectScrollbar('destroy');
					}, 0);
				} else {
					setTimeout(function() {
						$('.js-collapse').parent().perfectScrollbar({ wheelPropagation: true });
					}, 0);
				}
			},
			openSubMenu: function(e) {
				if(this.block.hasClass('is-collapsed') ) return;
				var _ = $(e.delegateTarget);
				var currentSubmenu = _.siblings('.js-submenu');
				var index = _.parent().index();

				if(_.hasClass('is-expanded')) {
					_.removeClass('is-expanded');
					currentSubmenu.removeClass('is-active');
					currentSubmenu.slideUp();
					this.check(index);
					return false;
				}

				this.sublink.removeClass('is-expanded');
				this.submenu.removeClass('is-active')
				this.submenu.slideUp('fast');
				_.addClass('is-expanded');
				currentSubmenu.addClass('is-active');
				currentSubmenu.slideDown();
				this.check(index);
			},
			check: function(n) {
				if (this.sublink.hasClass('is-expanded')) {
					sidebar.lastItem = n;
				} else {
					sidebar.lastItem = null;
				}
			}
		};
		sidebar.init();
		sidebar.collapseMenuOnMobile();
		sidebar.lastItem = null;
		sidebar.shouldCheck = false;
	})();

	$('.dropdown-menu').on('click', function(e) {
		e.stopPropagation();
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
		$('.js-height-auto').each(function() {
			var _ = $(this),
				position = _.offset().top,
				height = $(window).height() - position;


			_.outerHeight('auto')
				  .css('max-height', height)
			//
			// if ( _.hasClass('js-vert-scroll') ) {
			// 	_.css('max-height', height);
			// } else {
			// 	_.outerHeight(height);
			// }

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

	// toastr
	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-top-right",
	  "preventDuplicates": false,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "5000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
	$('.js-btn-error').click(function() {
       // show when the button is clicked
       toastr.error('E-mail format is incorrect.','Please fill “Address” field.');
    });
	$('.js-btn-success').click(function() {
       // show when the button is clicked
       toastr.success('E-mail format is incorrect.','Please fill “Address” field.');
    });
	$('.js-btn-info').click(function() {
       // show when the button is clicked
       toastr.info('E-mail format is incorrect.','Please fill “Address” field.');
    });
	$('.js-btn-warning').click(function() {
       // show when the button is clicked
       toastr.warning('E-mail format is incorrect.','Please fill “Address” field.');
    });


	$(window).resize(function() {
		// measureTablWidth();
		detectHeight();
		$('.js-scroll').perfectScrollbar('update');
	});
	$('.js-find').on('click', function() {

		$('.js-find-block').toggleClass('is-open');

	});
});
