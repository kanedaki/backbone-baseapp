define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone){
  var CommonView = Backbone.View.extend({
    initialize: function() {
      this.events = _.extend({}, this.constructor.__super__.events, this.events);
    },

    unbind: function() {
      unbind.__super__.constructor.apply(this, arguments);
      return this.stopListening();
    },

    assign: function(view, selector) {
      return view.setElement(this.$(selector)).render();
    },

    getRenderData: function() {
      var data, helpers, key, _i, _len, _ref;
      data = this.model || this.collection || this.mock;
      helpers = {};
      _ref = _.keys(this.helpers);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        helpers[key] = _.bind(this.helpers[key], this);
      }
      if (this.collection) {
        data = _.extend(helpers, {
          collection: data.toJSON()
        });
      } else {
        data = _.extend(data.attributes, helpers);
      }
      return data;
    },
    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      return this;
    },

    serialize: function(form, inputs) {
      var elements, serializer;
      if (inputs == null) {
        inputs = null;
      }
      inputs || (inputs = "input, select, textarea");
      elements = form.find(inputs);
      serializer = function(attributes, element) {
        element = $(element);
        if (element.attr('name') !== void 0) {
          // Add a case statement for each case (autocomplete ...)
          attributes[element.attr("name")] = element.attr('type') !== 'checkbox' ? element.val() : element.is(':checked');
        }
        return attributes;
      };
      return _.inject(elements, serializer, {});
    }

  });
  return CommonView;
});
