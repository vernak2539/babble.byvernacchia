$(function() {
	"use strict";

	// SEARCH STUFF (for every page but the actual search page)
	var $searchContainer = $('.site-search-container');
	var initialOffest    = parseInt( $searchContainer.css('top').replace(/px/, ''), 10 );

	$(document).on('click', '#js-search-toggle', function() {
		var searchContainerTopOffset = parseInt( $searchContainer.css('top').replace(/px/, ''), 10 );

		if( searchContainerTopOffset < 0 ) {
			$searchContainer.animate({
				top: 0
			}, 500);
			$searchContainer.find('#js-search-toggle').html('Close');
		} else {
			$searchContainer.animate({
				top: initialOffest
			}, 500);
			$searchContainer.find('#js-search-toggle').html('Search');
		}
		
	});
});
