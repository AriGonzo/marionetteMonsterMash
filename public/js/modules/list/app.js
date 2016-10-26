/*global define */
define([
  'app',
  'templates',
  'modules/list/listCtrl'
], function (app, templates) {
  'use strict';
  app.module("ListApp", function(ListApp, MonsterMashApp, Backbone, Marionette, $, _) {
    ListApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "list": 'viewList'
      },
      before: function( route, params) {
        MonsterMashApp.previousRoute = MonsterMashApp.getCurrentRoute();
        return true;
      }
    });

    var API = {
      viewList: function () {
        ListApp.Show.Controller.start();
      }
    };

    MonsterMashApp.on('main:start', function(){
      MonsterMashApp.navigate("list");
      API.viewList();
    });

    MonsterMashApp.addInitializer(function() {
      new ListApp.Router({
        controller: API
      });
    });
  })
})