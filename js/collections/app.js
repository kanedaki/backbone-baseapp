define([
  'underscore', 
  'backbone', 
  'storage', 
  'collections/common',
  'models/app'
  ], function(_, Backbone, Store, CommonCollection, App){

	var AppCollection = CommonCollection.extend({

    // Reference to this collection's model.
    model: App,

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Store("app"),
  });
  return new AppCollection();
});
