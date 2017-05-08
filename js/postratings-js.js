/*
+---------------------------------------------------------------+
|																|
|	WordPress Plugin: WP-PostRatings							|
|	Copyright (c) 2012 Lester "GaMerZ" Chan						|
|																|
|	File Written By:											|
|	- Lester "GaMerZ" Chan										|
|	- http://lesterchan.net										|
|																|
|	File Information:											|
|	- Post Ratings Javascript File								|
|	- wp-content/plugins/wp-postratings/postratings-js.php		|
|																|
+---------------------------------------------------------------+
*/



(function($) {
	// Variables
	var post_id = 0;
	var post_rating = 0;
	
	// Process Post Ratings
	function rate_post() {
		post_ratings_el = $('#post-ratings-' + post_id);
		post_ratings_nonce = $(post_ratings_el).data('nonce');
		if(typeof post_ratings_nonce == 'undefined' || post_ratings_nonce == null) {
			post_ratings_nonce = $(post_ratings_el).attr('data-nonce');
		}
        $.post({
			xhrFields: {withCredentials: true},
			url: ratingsL10n.ajax_url,
			data: 'action=postratings&pid=' + post_id + '&rate=' + post_rating + '&postratings_' + post_id + '_nonce=' + post_ratings_nonce,
			cache: false
		});
	}
	
	$(function(){
	    $('input[class^="wp-postrating"]').rating({
	    	emptyStar: '<i class="icon-star-empty"></i>',
			filledStar: '<i class="icon-star-full"></i>',
			showClear: false,
			showCaption: false,
			size: 'lg',
			step: 1
	    }).on('rating.change', function(event, value, caption) {
	    	var $this = $(this);
	    	post_id = $this.data('post-id');
	    	post_rating = value;
	    	rate_post();
	    });
	});
})(jQuery);