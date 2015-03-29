App.Models.Book = Backbone.Model.extend({
	urlRoot: '/books',
	initialize: function(){
		console.log('created New Books Model.');
	}
})