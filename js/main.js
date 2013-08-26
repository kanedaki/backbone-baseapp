require.config({
  baseUrl: "js/",
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone',
    solipsis: 'libs/solipsis',
    R: 'libs/prelude',
    rbbone: 'libs/backbone-integration',
    // storage has built in support for requirejs
    // hence, it doesn't need to configured in 'shim'
    storage: 'libs/backbone/backbone.localStorage',
    text: 'libs/require/text',
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
    R: {
      exports: 'R'
    },
    rbbone: {
      deps: ["R", "backbone"],
      exports: "R"
    }
  }
});

require(['app'], function(App){
  console.log("entry point")
  App.initialize()
});
