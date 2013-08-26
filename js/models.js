define([
  'underscore',
  'backbone',
  'R'
  ], function(_, Backbone, R) {
  /*** COMMON MODEL ***/

  var CommonModel = R.extend(Backbone.Model.extend, {

    // Default attributes for the model.
    defaults: {
    },

    // Ensure that each todo created has `content`.
    init: function(options) {
      this.super.call(this, options)
    }

  });

  /*** APP MODEL ***/
  var AppModel = R.extend(CommonModel.extend, {

    // Default attributes
    defaults: {
    }

  });
  return {
    AppModel: AppModel
  };
});
