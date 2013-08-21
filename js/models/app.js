define([
  'underscore',
  'backbone',
  'models/common'
  ], function(_, Backbone, CommonModel) {
  var AppModel = CommonModel.extend({

    // Default attributes
    defaults: {
    }

  });
  return AppModel;
});
