var Backbone = require('backbone');
var _ = require('underscore');

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
						var UserModel = require('../models/UserModel.js');
						var user = new UserModel({id: userId});
						user.fetch({
							success: function() {
								var PostsListView = require('../views/PostsListView.js');
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

module.exports = UsersListView;