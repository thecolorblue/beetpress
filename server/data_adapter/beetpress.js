var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    _ = require('underscore'),
    director = require('director'),
    ProductSchema;

module.exports = function(adapterConfig) {
  mongoose.connect(adapterConfig.url || 'mongodb://localhost/beetpress');
  var router = new director.http.Router({
    '/stores': {
      get: function(next) {
        var _this = this;
        console.log('store arguments:', arguments);
        mongoose.connection
          .model('Store')
          .get({},
          function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      }
    },
    '/products': {
      get: function(next) {
        var _this = this;
        mongoose.connection
          .model('Product')
          .get(this.req.body, function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      },
      post: function(next) {
        var _this = this;

        mongoose.connection
          .model('Product')
          .post(this.req.body, function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      },
      put: function(type, next) {
        var _this = this;
        mongoose.connection
          .model(parse(type))
          .put(this.req.body, function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      },
      delete: function(type, next) {
        var _this = this;
        mongoose.connection
          .model(parse(type))
          .delete(this.req.body, function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      }
    },
    '/:producer/:name': {
      get: function(producer, name, next) {
        var _this = this;
        mongoose.connection
          .model('Product')
          .get({
            producer: {
              username: producer
            },
            name: name
          }, function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      },
      post: function(producer, name, next) {
        var _this = this;
        mongoose.connection
          .model('Store')
          .find({ username: producer }, function(err, response) {
            mongoose.connection
            .model('Product')
            .create(_this.req.body,
              function(err, response) {
                _this.err = err;
                _this.response = response;
                next(!!err);
              });
          });        
      },
      patch: function(producer, name, next) {
        var _this = this;
        mongoose.connection
          .model('Store')
          .find({ username: producer }, function(err, response) {
            mongoose.connection
            .model('Product')
            .findOneAndUpdate({
              producer: response[0]._id,
              name: name
            }, _this.req.body, function(err, response) {
                _this.err = err;
                _this.response = response;
                next(!!err);
              });
          });        
      }
    },
    '/stores/:producer': {
      get: function(producer, next) {
        var _this = this;
        console.log(arguments)
        mongoose.connection
          .model('Store')
          .get({
            username: producer
          }, function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });

      },
      post: function(producer, next) {
        var _this = this;
        mongoose.connection
          .model('Store')
          .create(this.req.body,
          function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      },
      patch: function(producer, next) {
        var _this = this;
        mongoose.connection
          .model('Store')
          .findOneAndUpdate({
            username: producer  
          },
          this.req.body,
          function(err, response) {
            _this.err = err;
            _this.response = response;
            next(!!err);
          });
      }
    }
  });

  router.configure({ async: true });

  function parse(model) {
    model = model.toLowerCase();
    model = model[0].toUpperCase() + model.substr(1, model.length);
    return model.substr(-1) === 's' ? model.substr(0, model.length - 1) : model;
  }

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

      router.dispatch({ // fake request object
        url: api.path,
        method: api.method,
        user: req.user,
        headers: {
          'content-type': 'application/json'
        },
        body: _.extend({}, req.body, req.params, req.query)
      },
      {}, // fake response object (not used)
      function() {
        // all requests call this, which responds with any response and errors
        callback(this.err, { statusCode: this.status || 200 }, this.response);
      });
    },
    mongoose: mongoose
  };
};

module.exports.models = {
  User: mongoose.model('User', require('./user_model')),
  Product: mongoose.model('Product', require('./product_model')),
  Event: mongoose.model('Event', require('./event_model')),
  Store: mongoose.model('Store', require('./store_model')),
  Cart: mongoose.model('Cart', require('./cart_model'))
};
