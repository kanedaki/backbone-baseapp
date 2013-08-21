define([
  'jquery',
  'underscore', 
  'backbone',
  'views/common',
  'text!templates/app.html'
  ], function($, _, Backbone,  CommonView, template){
  var AppView = CommonView.extend({

    el: $("body"),

    template: _.template(template),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
    },
    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
  return AppView;
});
