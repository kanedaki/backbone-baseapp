define(['underscore', 'backbone'], function(_, Backbone) {
  var CommonModel = Backbone.Model.extend({

    // Default attributes for the model.
    defaults: {
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
    }

  });
  return CommonModel;
});
