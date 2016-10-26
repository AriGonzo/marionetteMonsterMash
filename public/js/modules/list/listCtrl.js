/*global define */
define([
  'app',
  'templates',
  'entities/guest',
  'modules/list/listView'
], function (app, templates) {
  app.module("ListApp.Show", function(Show, MonsterMashApp, Backbone, Marionette, $, _){
    Show.Controller = $.extend({}, (Show && Show.Controller ? Show.Controller : {}), {
      start: function(){
        //set controller variables
        var that = this;
        this.layoutView = null;
        this.guestListCollection = null;

        //Event Aggregator to move event triggers between views
        this.vent = new Backbone.Wreqr.EventAggregator();
        this.vent.on('clicked_guest', function(model){
          that.showMonsterDetail(model)
        });
        this.vent.on('noGuestsLeft', function(){
          that.showEmptySideView();
        });

        //Make request to back end for data
        var request = $.when(
          MonsterMashApp.request("get_guestList") // ret 1
        ).
        done(function(ret1){
          that.guestListCollection = ret1;

          //Create Layout and Views for Guest List
          that.layoutView = new Show.Layout();
          var leftSidebar = new Show.LeftNav();

          //Call the region views into the layout
          that.layoutView.on('show', function(){
            this.left.show(leftSidebar);
            that.showGuestList();
          });

          //View Triggers
          leftSidebar.on('addNewGuest', function(){
            that.addNewGuest();
          });
          leftSidebar.on('showGuests', function(){
            that.showGuestList();
          });

          //Call the app into the main region
          MonsterMashApp.main.show(that.layoutView)

        });
      },
      addNewGuest: function(){
        var that = this;
        var addGuestView = new Show.AddGuest({
          model: new MonsterMashApp.Entities.Guest
        });
        
        addGuestView.on('done_add', function(model){
          if (model)
            that.guestListCollection.add(model)
          that.showGuestList(model)
        });

        this.layoutView.middle.empty();
        this.layoutView.right.empty();
        this.layoutView.middle.show(addGuestView);
      },
      showMonsterDetail: function(model){
        console.log(model)
        var that = this;
        var selectedModel = !model ? this.guestListCollection.models[0] : model;
        var monsterDetailView = new Show.MonsterDetail({
          model: selectedModel
        });
        monsterDetailView.on('monster_removed', function(){
          if (that.guestListCollection.length > 0) {
            that.showMonsterDetail();
          } else {
            that.showEmptySideView();
          }
        });

        this.layoutView.right.empty();
        this.layoutView.right.show(monsterDetailView);
      },
      showGuestList: function(model){
        if (this.guestListCollection.length > 0) {
          this.showMonsterDetail(model);
        } else {
          this.showEmptySideView();
        }
        var monsterListCollectionView = new Show.MonsterListCollection({
          collection: this.guestListCollection,
          vent: this.vent
        });

        this.layoutView.middle.empty();
        this.layoutView.middle.show(monsterListCollectionView);
      },
      showEmptySideView: function(){
        var emptySideBar = new Show.EmptySideView();
        this.layoutView.right.empty();
        this.layoutView.right.show(emptySideBar);
      }
    });
  });
});