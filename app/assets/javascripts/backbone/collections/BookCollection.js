App.Collections.BookCollection = Backbone.Collection.extend({
	model: App.Models.Book,
	url: '/books',
	initialize: function() {
		App.offset = App.starterOffset;
	},
	//Grabs the next 'offset' number of books from the database
	fetchMoreBooks: function() {
		this.fetch({
			//tells it not to replace the data that's already in there but add to it.
			remove: false,
			url: '/get_more',
			data: {offset: App.offset,
								tag: App.tagID},
			success: _.bind(function(e){
        App.offset += 1;
      }, this)    
		});	
	},
	// Get all the books associated with a tag.
	// Needed so that the infinite scroll won't mess with the tag book functionality
	fetchTagBooks: function() {
		this.fetch({
			remove: false,
			url: '/tag_books',
			data: {tag: App.tagID},
			success: function(e){
				console.log('books for:' + App.tagID);
				App.booksListView = new App.Views.BooksListView({collection: e});
			}
		});
	}
});