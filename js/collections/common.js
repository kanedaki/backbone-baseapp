define([
  'underscore', 
  'backbone', 
  'storage',
  'models/common'
  ], function(_, Backbone, Store, CommonModel){

	var CommonCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: CommonModel,

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Store("common"),

  });
  return CommonCollection;
});
