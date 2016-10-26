/*global define */
define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	var app = new Marionette.Application();
	
	app.addRegions({
		main: '#main'
	})

	app.navigate = function(route,  options){
	  options || (options = {});
	  Backbone.history.navigate(route, options);
	};

	app.getCurrentRoute = function(){
	  return Backbone.history.fragment
	};

	app.on('start', function(){
		app.trigger('main:start');
	});

	return window.app = app;
});