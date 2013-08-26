define([
  'underscore',
  'backbone',
  'R',
  'storage',
  'models'
  ], function(_, Backbone, R, Store, models){

 /*** COMMON COLLECTION ***/

	var CommonCollection = R.extend(Backbone.Collection, {

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Store("common"),

  });

  /*** APP COLLECTION ***/

	var AppCollection = R.extend(CommonCollection.extend, {

    // Reference to this collection's model.
    model: models.App,

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Store("app"),
  });
  return {
    AppCollection: AppCollection
  };
});
