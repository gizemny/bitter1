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

	initiate: function() {
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function() {
		this.$el.html(this.template({ post: this.model })); 
	}
});

//if its list view them it is a collection 
var PostsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: undefined,

	initialize: function() {
		this.listenTo(this.collection, 'all', function(event) {
			console.log(event);
		});
		this.listenTo(this.collection, 'sync update', this.render);
	},

	render: function() {
		var that = this; 
		//pass in the collection 
		this.collection.each(function(postModel) {
			// instantiate the itemView by looping through each and add pass in your model template
			var postItemView = new PostItemView({ model: postModel });
			postItemView.render();
			// this is how you attach el of post item view into this el 
			that.$el.append(postItemView.el);
		}); 
	}
});

// post collection has memorized the models
var posts = new PostsCollection(); 

// need success call back because asychronous
posts.fetch();

var postsListView = new PostsListView({ collection: posts });
postsListView.render();

$('#content').html(postsListView.el);
console.log('view inserted!');


