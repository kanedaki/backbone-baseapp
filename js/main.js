// Filename: main.js

// Require.js allows us to configure mappings to paths
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone',

    // storage has built in support for requirejs
    // hence, it doesn't need to configured in 'shim'
    storage: 'libs/backbone/backbone.localStorage',
    text: 'libs/require/text'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    }
  }
});

require([ 'views/app', 'collections/app' ], function(AppView, AppCollection){
  var app_view = new AppView({
    collection: AppCollection
  });
  app_view.render();
});
