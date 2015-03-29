// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require backbone
//= require handlebars
//= require_self
//= require_tree ./backbone/routers
//= require_tree ./backbone/models
//= require_tree ./backbone/collections
//= require_tree ./backbone/views
//= require_tree ./templates
//= require_tree .
var App = {
	Models: {}, 
	Collections: {}, 
	Views: {}, 
	Routers: {}
};


$(function() {
	App.router = new App.Routers.Router();
	App.starterOffset = 50;

	App.tags = new App.Collections.TagCollection();
			//The tags can only be routed after the router variable has been set.
	App.tags.fetch({
		reset: true,
		success: function() {
			console.log('finished loading tags');
		}
	});
	App.tagsListView = new App.Views.TagsListView({collection: App.tags});
	App.tagID = undefined;

	App.books = new App.Collections.BookCollection();
	App.books.fetch({
		reset: true,
		//The router can only be called after all the books have been fetched
		success: function(){
			console.log('finished loading books');
			App.router.on('route:modalView', function(id){
				App.bookModalView.showBook(App.books.get(id));
			});
			App.router.on('route:tagView', function(id){

			});
		}
	});
	App.booksListView = new App.Views.BooksListView({collection: App.books});

	//This variable is mentioned in bookCollection.js and tagView.js
	// It aligns with the limit used in the controller to setup how many books load at a time.
	App.bookModalView = new App.Views.BookModalView();

	$('body').on('mouseenter', '.post_box', renderImageHover);
	$('body').on('mouseleave', '.post_box', hideImageHover);
	$('body').on('mousedown', '#open_menu', displayTagMenu);
	$('body').on('mouseleave', '#menu', displayTagMenu);
	$('body').on('mousedown', 'h1', refreshPage);
	$('body').on('mousedown', '#popup_bkgd', hideModal);
	
	window.onpopstate = function(event){    
    if(history.state) {
      location.reload(); 
    }
	}

	//Infinite scroll feature was causing the tagged book modals to break, 
	//because not all the book information was grabbed from the backend yet.
	$(window).scroll(function(){
		if ($(window).scrollTop() > $('body').height() / 2){
    	App.books.fetchMoreBooks();// ajax call get data from server and append to the div
    }
	});
	//it is key to set the pushState to true so 
	//that the history acknowledges backbone route changes.
	Backbone.history.start({pushState: false});
});

//reverts page to initial index
function refreshPage(){
	App.tagID = undefined;
	App.offset = App.starterOffset;
	App.books = new App.Collections.BookCollection();
	App.booksListView = new App.Views.BooksListView({collection: App.books});
	App.books.fetch({reset: true});
	App.router.navigate('');
	App.bookModalView.hide();
}

//shows pop-up over index books
function renderImageHover(){
	var imageWidth = $(this).find('.thumbnail').css('width');
	var imageHover = $(this).find('.book_hover');
	imageHover.css('width', imageWidth);
	imageHover.css('display', 'block').hide().fadeIn();
}

//removes hover from index books
function hideImageHover(){
	var imageHover = $(this).find('.book_hover');
	imageHover.css('display', 'none');
}

//allows the top menu to unfold.
function displayTagMenu(){
	$('#tags_list').slideToggle({
		duration: 800,
		complete: function(){
			if ($('#tags_list').css('display') == 'none') {
				$('#open_text').text('Select Grades/Topics').hide().fadeIn(800);	
			} else {
				$('#open_text').text('Hide').hide().fadeIn(800);
			}
		}
	});
}

function hideModal(){
	App.bookModalView.hide();
}

