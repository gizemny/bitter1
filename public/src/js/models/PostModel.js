var Backbone = require('backbone');

var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id'
});

module.exports = PostModel;