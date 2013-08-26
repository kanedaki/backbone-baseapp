define([
    'jquery',
    'underscore', 
    'backbone',
    'R'
    ], function($, _, Backbone, R){
      var SortableCollectionMixin = {
        sortedBy: function(comparator) {
          var sourceCollection = this;
          var sortedCollection = new this.constructor;
          sortedCollection.comparator = comparator;
          var applySort = function() {
            sortedCollection.reset(sourceCollection.models);
            sortedCollection.sort();
          };
          this.on("change", applySort);
          this.on("add",    applySort);
          this.on("remove", applySort);
          applySort();
          return sortedCollection;
        }
      };
      var FilterableCollectionMixin = {
        filtered: function(criteriaFunction) {
          var sourceCollection = this;
          var filteredCollection = new this.constructor;
          var applyFilter = function() {
            filteredCollection.reset(sourceCollection.select(criteriaFunction));
      };
          this.bind("change", applyFilter);
          this.bind("add",    applyFilter);
          this.bind("remove", applyFilter);
          applyFilter();
          return filteredCollection;
        }
      };
    });
