var Backbone = require('backbone');
var _ = require('underscore');

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
		var UsersCollection = require('../collections/UsersCollection.js');
		var users = new UsersCollection();
		users.fetch();
		var UsersListView = require('../views/UsersListView.js');
		var usersListView = new UsersListView({
			collection: users
		});
		this.$el.find('#all-users').html(usersListView.render().el);
	},

	insertPosts: function() {
		var PostsCollection = require('../collections/PostsCollection.js');
		var posts = new PostsCollection();
		posts.fetch();
		var PostsListView = require('../views/PostsListView.js');
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

module.exports = HomeView;
