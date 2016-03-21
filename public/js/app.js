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

var PostCollection = Backbone.Collection.extend({
	url: '/api/posts/',
	model: PostModel
});

//these are objects nested in {} so we use : and , 
//because it is an Item View, this will have the post model associated with it 
var PostItemView = Backbone.View.extend({
	el: '<div></div>',
	template: _.template('<h2><%= post.get("description") %></h2>'),
	render: function() {
		this.$el.html(this.template({post: this.model})) 
	}
});
//if its list view them it is a collection 

var post = new PostModel({id: 1});

//trying to stop from renders before we get a title
//because it is asychronous so we want a success callback
post.fetch({
	success: function() {
		//instantiate new one
		var postItemView = new PostItemView({ model: post });
		//render
		postItemView.render();
		//stick it into the .el and stick that into the content div from our home template
		$('#content').html(postItemView.el);
	}
});


