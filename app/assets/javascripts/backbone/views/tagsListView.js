App.Views.TagsListView = Backbone.View.extend({
	el: '#tags_list',
	initialize: function(){
		this.renderTagList();
		this.listenTo(this.collection, 'add', this.renderTagList);
		this.listenTo(this.collection, 'reset', this.renderTagList);
	},
	//Tells each row in the tags database to convert into menu button/ 
	renderTagList: function() {
		this.collection.each(this.renderTag, this);
	},
	renderTag: function(tag) {
		var tagModel = new App.Views.TagView({model: tag});
		if (tag.get('name').match(/\d+/)) {
			//adds the tag to the grades category if it starts with a number
			this.$el.find('#grades').append(tagModel.$el);
		} else {
			//when in doubt, it adds the tag under categories 
			this.$el.find('#categories').append(tagModel.$el);
		}
	}
});