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

module.exports = PostsListView;
