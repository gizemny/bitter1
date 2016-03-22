'use strict';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id'
});

var PostsCollection = Backbone.Collection.extend({
	url: '/api/posts/',
	model: PostModel
});

//these are objects nested in {} so we use : and , 
//because it is an Item View, this will have the post model associated with it 
var PostItemView = Backbone.View.extend({
	el: '<li></li>',

	template: _.template('<h2><%= post.get("description") %></h2>'),

	render: function() {
		this.$el.html(this.template({ post: this.model })); 
	}
});

//if its list view them it is a collection 
var PostsListView = Backbone.View.extend({
	el: '<ul></ul>',
	template: undefined,

	render: function() {
		var that = this; 
		this.collection.each(function(postModel) {
			var postItemView = new PostItemView({ model: postModel });
			postItemView.render();
			// this is how you attach el of post item view into this el 
			that.$el.append(postItemView.el);
			$('#content').html(postsListView.el);
		}); 
	}
});

// var post = new PostModel({id: 1});

// //trying to stop from renders before we get a title
// //because it is asychronous so we want a success callback
// post.fetch({
// 	success: function() {
// 		//instantiate new one
// 		var postItemView = new PostItemView({ model: post });
// 		//render
// 		postItemView.render();
// 		//stick it into the .el and stick that into the content div from our home template
// 		$('#content').html(postItemView.el);
// 	}
// });


