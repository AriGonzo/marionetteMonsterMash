require.config({
	paths: {
		backbone: '../node_modules/backbone/backbone-min',
		marionette: '../node_modules/backbone.marionette/lib/backbone.marionette',
		jquery: '../node_modules/jquery/dist/jquery.min',
		underscore: '../node_modules/underscore/underscore-min',
		tpl: 'lib/tpl',
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		}
	},
	deps: ['jquery', 'underscore']
});

require([
	'app',
	'backbone',
	'modules/list/app',
	'underscore'
], function (app, _) {
	'use strict';

	app.start();
});