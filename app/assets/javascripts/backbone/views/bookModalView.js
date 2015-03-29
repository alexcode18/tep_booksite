 App.Views.BookModalView = Backbone.View.extend({
	el: '#popup_book',
	initialize: function(){
		this.template = HandlebarsTemplates['bookModal'];

	},
	events: {
		'click .prev_button': 'prevBook',
		'click .next_button': 'nextBook',
		'click .close_button': 'hide',
		'click #popup_bkgd': 'hide',
		'click .tag':'renderTagBooks'
	},
	renderBook: function() {
		this.$el.empty();
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.find('.book_info').hide().fadeIn();
		
		if (this.$el.parent().css('display') != 'block') {
			this.show();
		}
		App.router.navigate('books/' + this.model.toJSON().id);
	},
	showBook: function(model) {
		this.model = model;
		this.renderBook();
	},
	hide: function() {
		this.$el.parent().fadeOut();
	},
	show: function() {
		this.$el.parent().css('display', 'block').hide().fadeIn();
	},
	prevBook: function() {
		var prevID = $('#' + this.model.toJSON().id).prev().attr('id');
		if (prevID) {
			this.model = App.books.get(prevID);
			this.renderBook();
		}
	},
	nextBook: function() {
		var nextID = $('#' + this.model.get('id')).next().attr('id');

		if (nextID) {
			this.model = App.books.get(nextID);
			$('html, body').animate({scrollTop:$('#' + nextID).position().top}, 'slow');
			this.renderBook();
		}
	},
	// When a tag button is clicked, get the tag id # and find the associated tag. Then, create a TagView for that tag
	// and call the function that grabs and sets the associated books on the list page. 
	renderTagBooks: function(tag){
		pickedTag = App.tags.get($(tag.currentTarget).attr('id'));
		console.log(pickedTag);
		newTagList = new App.Views.TagView({model: pickedTag});
		newTagList.getTagBooks();
	}
});