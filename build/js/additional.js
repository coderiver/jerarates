$(document).ready(function() {
	$('.js-toggle-rows').on('click', 'tr', function() {
		$(this).siblings('tr').removeClass('is-chosen');
		$(this).addClass('is-chosen');
	});
	$('.js-toggle-rows').on('click', '.js-check', function(e) {
		e.stopPropagation();
	});
});