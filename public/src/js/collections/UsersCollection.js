var Backbone = require('backbone');
var UserModel = require('../models/UserModel.js');

var UsersCollection = Backbone.Collection.extend({
	url: '/api/users/',
	model: UserModel
});

module.exports = UsersCollection;