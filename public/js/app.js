'use strict';

$.ajax('/api/posts', {
	type: 'GET',
	success: function(posts) {
		var string = '';
		//to loop over we use jquery	
		_.each(posts, function(post){
			console.log(post);
			string += post.description; //concatenate the values
			string += '<br>'; 
		});

		$('#content').html(string);
	}
})