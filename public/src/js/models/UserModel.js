var Backbone = require('backbone');

var UserModel = Backbone.Model.extend({
	urlRoot: '/api/users/',
	idAttribute: 'id',

	parse: function(response) {
			if (response.posts) {
				var PostsCollection = require('../collections/PostsCollection.js');
				response.posts = new PostsCollection(response.posts);
			}
			return response;
		}
});

module.exports = UserModel;