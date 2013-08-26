define([
  'jquery',
  'underscore', 
  'backbone',
  'R',
  'text!templates/app.html'
  ], function($, _, Backbone, R, template){

  /*** Composite View pattern implementation **/
  // TODO
  


  /*** Common View ***/

  var CommonView = R.extend(Backbone.View, {
    init: function(options) {
      Backbone.View.call(this, options)
      //this.events = _.extend({}, this.constructor.__super__.events, this.events);
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
  });

  ErrorList = function (response) {
    if (response && response.responseText) {
      this.attributesWithErrors = JSON.parse(response.responseText);
    }
  };
  _.extend(ErrorList.prototype, {
    each: function (iterator) {
      _.each(this.attributesWithErrors, iterator);
    },
    size: function() {
      return _.size(this.attributesWithErrors);
  } });
  /*** Error View
  Example of html
    <form id="example_form">
      <ol>
    <li id="task_title_input">
    <label for="task_title">Title</label>
    <input id="task_title" name="title" type="text"> <!--
            <p class="inline-errors">
              The error for this field will be rendered here.
    </p> -->
    </li> </ol>
    </form>
  ***/
  ErrorView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, "renderError");
    },
    render: function() {
      this.$(".error").removeClass("error");
      this.$("p.inline-errors").remove();
      this.options.errors.each(this.renderError);
  },
    renderError: function(errors, attribute) {
      var errorString = errors.join(", ");
      var field = this.fieldFor(attribute);
      var errorTag = $('<p>').addClass('inline-errors').text(errorString);
      field.append(errorTag);
      field.addClass("error");
    },
    fieldFor: function(attribute) {
      return $(this.options.el).find('li[id*="_' + attribute + '_input"]').first();
  } });
  /*** Page View ***/

  var PageView = R.extend(CommonView, {
    attributes: {"data-role": "page"}
  });

  /*** Form View ***/ 

  var FormView = R.extend(CommonView, {
    form: $('form')
    attributes: {"data-role": "form"},
    init: function(options) {
      CommonView.call(this, options)
      model.on('error', _.bind(this.drawInlineErrors, this))
    },

    drawInlineErrors: function(model, response, options) {
      var attributesWithErrors = JSON.parse(response.responseText);
      new ErrorView({
        el: this.form,
        attributesWithErrors: attributesWithErrors
      }).render();
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
          value = switch (element.attr('type'))
            case 'checkbox'
              element.is(':checked')
            default:
              element.val()
              break;
          attributes[element.attr("name")] = value
        }
        return attributes;
      };
      return _.inject(elements, serializer, {});
    },
    save: function() {
     error: function(model, response) {
        var errors = new ErrorList(response);
        var view   = new ErrorView( { el: self.el, errors: errors } );
        view.render();
    }
  });
  /*** App View ***/
  var AppView = R.extend(PageView, {
    el: $("body"),

    template: _.template(template),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
    },
    render: function() {
      console.log("render app view")
      this.$el.html(this.template());
      return this;
    }
  });
  return {
    AppView: AppView
  };
});
