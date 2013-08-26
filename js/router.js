define([
  'underscore',
  'backbone',
  'R',
  'views',
  'collections'
  ], function(_, Backbone, R, views, collections){
  var SwappingRouter = function(options) {
    Backbone.Router.apply(this, [options]);
  };
  _.extend(SwappingRouter.prototype, Backbone.Router.prototype, {
    swap: function(newView) {
      if (this.currentView && this.currentView.leave) {
        this.currentView.leave();
      }
      this.currentView = newView;
      $(this.el).empty().append(this.currentView.render().el);
    }
  });
  SwappingRouter.extend = Backbone.Router.extend;

	var AppRouter = R.extend(Backbone.Router, {
    init: function(options){
      //Para llamar al constructor de la clase que estoy extendiendo con R.extend
      this.super.call(this, options)
      //this.config = new Config();
      //this.Utils= new Utils();
    },
    routes: {
      "": "index"
    },
    goBack: function() {
      // Implement go back
    },
    index: function() {
      console.log("index")
      var appView = new views.AppView({
        collection: collections.AppCollection
      });
      appView.render();
    }
  });
  return AppRouter;
});
