/*global define */
define([
  'app'
], function (app) {
  'use strict';
  app.module("Entities", function(Entities, app, Backbone, Marionette, $, _){

    Entities.Guest = Backbone.Model.extend({
      urlRoot: "api/guest",
      idAttribute: "_id"
    });

    Entities.GuestCollection = Backbone.Collection.extend({
      url: function() {
        return "api/guestList";
      },
      model: Entities.Guest
    });

    var API = {
      getGuestEntities: function(){
        var records = new Entities.GuestCollection();
        var defer = $.Deferred();
        records.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        $.when(promise).done(function(records){});
        return promise;
      },

      getGuestEntity: function(){
        var record = new Entities.Profile();
        var defer = $.Deferred();
        if (id)
          record.set("_id", id);
        record.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
        return defer.promise();
      },

    };

    app.reqres.setHandler("get_guestList", function(){
      return API.getGuestEntities();
    });

    app.reqres.setHandler("get_guestInfo", function(id){
      return API.getGuestEntity(id);
    });

  });

});