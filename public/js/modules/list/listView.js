define([
  'app',
  'templates'
], function (app, templates) {
	'use strict';
	app.module("ListApp.Show", function (Show, MonsterMashApp, Backbone, Marionette, $, _) {

		Show.Layout = Marionette.LayoutView.extend({
			className: 'container-fluid',
			template: templates.layout,
			regions: {
				left: '#leftCol',
				middle: '#middleCol',
				right: '#rightCol'
			}
		});
		
		Show.LeftNav = Marionette.ItemView.extend({
			template: templates.leftNav,
			className: 'actionButtonContainer',
			ui: {
				showGuestList: '#showGuestList',
				addGuest: '#addGuest'
			},
			events: {
				'click @ui.showGuestList': 'showGuestList',
				'click @ui.addGuest': 'addGuest'
			},
			showGuestList: function(){
				this.trigger('showGuests');
			},
			addGuest: function(){
				this.trigger('addNewGuest');
			}
		});

		Show.MonsterEmptyView = Marionette.ItemView.extend({
			initialize: function(){
				console.log(this.options)
				this.options.vent.trigger('noGuestsLeft')
			},
			template: templates.monsterCollectionEmpty
		});
		
		Show.MonsterListItem = Marionette.ItemView.extend({
			template: templates.monsterItem,
			tagName: 'tr',
			className: 'monsterItem',
			ui: {
				monsterItem: '.monsterItem'
			},
			events: {
				'click @ui.monsterItem': 'showMonsterDetail'
			},
			showMonsterDetail: function(){
				$('.monsterItem').removeClass('selected');
				$(this.el).addClass('selected');
				this.options.vent.trigger('clicked_guest', this.model);
			}
		});

		Show.MonsterListCollection = Marionette.CompositeView.extend({
			template: templates.monsterCollection,
			childView: Show.MonsterListItem,
			emptyView: Show.MonsterEmptyView,
			childViewContainer: '#guestListContainer',
			childViewOptions: function(){
				return {
					vent: this.options.vent
				}
			}
		});

		Show.MonsterDetail = Marionette.ItemView.extend({
			template: templates.monsterDetail,
			ui: {
				removeGuest: '#removeGuest'
			},
			events: {
				'click @ui.removeGuest': 'removeGuest'
			},
			removeGuest: function(){
				var that = this;
				this.model.destroy({
					success: function(){
						that.trigger('monster_removed')
					}
				})
			}
		});

		Show.AddGuest = Marionette.ItemView.extend({
			template: templates.addGuestFields,
			ui: {
				guestName: '#guestName',
				guestImage: '#guestImage',
				guestPhone: '#guestPhone',
				guestEmail: '#guestEmail',
				guestDrink: '#guestDrink',
				btnSubmit: '#btnSubmit',
				btnCancel: '#btnCancel'
			},
			events: {
				'click @ui.btnSubmit': 'submitNewUser',
				'click @ui.btnCancel': 'cancelNewUser'
			},
			submitNewUser: function(){
				var that = this;
				this.model.set({
					name: this.ui.guestName.val(),
					imageLink: this.ui.guestImage.val(),
					email: this.ui.guestEmail.val(),
					phoneNumber: this.ui.guestPhone.val(),
					favoriteDrink: this.ui.guestDrink.val()
				});
				this.model.save(null, {
					success: function(){
						console.log('save')
						that.trigger('done_add', that.model);
					}
				});
			},
			cancelNewUser: function(){
				this.trigger('done_add');
			}
		});
		Show.EmptySideView = Marionette.ItemView.extend({
			template: templates.monsterEmptyView
		});
	});
});