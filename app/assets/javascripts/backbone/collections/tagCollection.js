App.Collections.TagCollection = Backbone.Collection.extend({
	model: App.Models.Tag,
	url: '/tags',
	initialize: function() {
		console.log('new Tag collection created');
	}
});