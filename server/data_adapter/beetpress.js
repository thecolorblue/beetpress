var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    _ = require('underscore'),
    ProductSchema;

function callbackFactory(callback) {
  return function(err, response) {
    callback(err, { statusCode: 200 }, response);
  }

}

module.exports = function(adapterConfig) {
  mongoose.connect(adapterConfig.url || 'mongodb://localhost/beetpress');
  
  return {
    request: function(req, api, options, callback) {

      /**
       * Allow for either 3 or 4 arguments; `options` is optional.
       */
      if (arguments.length === 3) {
        callback = options;
        options = {};
      }

      if(api.path.substr(-1) === '/') {
        api.path = api.path.substr(0, api.path.length - 1);
      }

      var pathModel = api.path.match(/^\/(.*)/);
      var modelName = pathModel && pathModel.length ? parse(pathModel[1]) : '';
      var method = api.method.toLowerCase();
      var model = mongoose.connection.model(modelName);

      if(model && model[method]) {
        model[method](req, api, callbackFactory(callback));
      } else {
        callback('method_missing');
      }

      function parse(model) {
        model = model.toLowerCase();
        model = model[0].toUpperCase() + model.substr(1, model.length);
        return model.substr(0, model.length - 1);
      }
    }
  };
};

module.exports.models = {
  User: require('./user_model'),
  Product: require('./product_model')
};
