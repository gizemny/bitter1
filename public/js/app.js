'use strict';

$(document).on('ready', function() {
	$.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});
});

var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id'
});

var PostsCollection = Backbone.Collection.extend({
	url: '/api/posts/',
	model: PostModel
});

var UserModel = Backbone.Model.extend({
	urlRoot: '/api/users/',
	idAttribute: 'id',

	parse: function(response) {
			if (response.posts) {
				response.posts = new PostsCollection(response.posts);
			}
			return response;
		}
});

var UsersCollection = Backbone.Collection.extend({
	url: '/api/users/',
	model: UserModel
});

var UsersListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: _.template('\
		<% users.each(function(user) { %>\
			<li><a data-id="<%= user.id %>" href="#"><%= user.get("name") %></a></li>\
		<% }) %>\
	'),

	events: {
		'click a': function(event) {
			event.preventDefault();
						var userId = $(event.target).data('id');
						var user = new UserModel({id: userId});
						user.fetch({
							success: function() {
								var postsListView = new PostsListView({ 
									collection: user.get('posts')
								});
								$('#posts').html(postsListView.render().el);
							}
						});
		}
	},

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(this.template({ users:this.collection }));
		return this;
	}
});

var PostsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: _.template('\
		<% posts.each(function(post) { %>\
			<li>\
				<a href="#"><%= post.get("description") %></a>\
			</li>\
		<% }) %>\
	'),

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(this.template({ posts:this.collection }));
		return this;
	}
});


var HomeView = Backbone.View.extend({
	el:'\
		<div class="container">\
			<div class="row">\
				<div class="three columns"></div>\
				<div class="six columns">\
					<div class="row">\
						<div class="twelve columns" id="all-users"></div>\
					</div>\
					<div class="row">\
						<div class="twelve columns"></div>\
					</div>\
				</div>\
				<div class="three columns" id="posts"></div>\
			</div>\
		</div>\
	',

	insertUsers: function() {
		var users = new UsersCollection();
		users.fetch();
		var usersListView = new UsersListView({
			collection: users
		});
		this.$el.find('#all-users').html(usersListView.render().el);
	},

	insertPosts: function() {
		var posts = new PostsCollection();
		posts.fetch();
		var postsListView = new PostsListView({
			collection: posts
		});
		this.$el.find('#posts').html(postsListView.render().el);
	},



	render: function() {
		this.insertUsers();
		this.insertPosts();

		return this;
	}

});

var homeView = new HomeView();
$('#content').html(homeView.render().el);



