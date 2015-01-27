var _ = require('underscore');

module.exports = {
  index: function(params, callback) {
    this.app.set('title', 'Products');
    var spec = {
      collection: {collection: 'Products', params: params}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });
  },

  show: function(params, callback) {
    var spec = {
      model: {model: 'Product', params: params }
    };
    this.app.fetch(spec, function(err, result) {
      // We must check for an error before accessing `result.model` (below),
      // which may be undefined if there's an error (404, 500, etc.).
      if (err) return callback(err);

      // Because the page title depends on the Product model, we wait to set it
      // until the fetch is complete.
      this.app.set('title', 'Product: ' + result.model.get('title'));
      this.app.set('og', _.pick(result.model.attributes, 'title', 'name', 'description'));
      callback(null, 'products/show', result);
    }.bind(this));
  },

  edit: function(params, callback) {
    var spec = {
      model: {model: 'Product', params: params }
    };
    this.app.fetch(spec, function(err, result) {
      // We must check for an error before accessing `result.model` (below),
      // which may be undefined if there's an error (404, 500, etc.).
      if (err) return callback(err);

      // Because the page title depends on the Product model, we wait to set it
      // until the fetch is complete.
      this.app.set('title', 'Product Edit: ' + result.model.get('title'));
      callback(null, 'products/edit', result);
    }.bind(this));
  },
  create: function(params, callback) {
    var spec = {
      collection: {
        collection: 'Stores',
        params: _.extend(params, { owners: true })
      }
    };
    console.log(spec);
    this.app.fetch(spec, function(err, result) {
      callback(err, 'products/create', result);
    });
  }
};
