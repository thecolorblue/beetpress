var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    _ = require('underscore'),
    ProductSchema;

/* Schemas */
ProductSchema = new Schema({
  title: String,
  name: String,
  description: String,
  date: Date,
  del: Boolean
});

ProductSchema.path('name').required(true).index(true);
ProductSchema.path('title').required(true).index(true);
ProductSchema.path('description').required(true);
ProductSchema.path('date').default(Date.now);
ProductSchema.path('del').default(false);

ProductSchema.statics.get = function(req, api, callback) {
  var id = req.param('id');
  var name = req.param('name');
  if (id) {
    this.findById(id).exec(callback);
  } else if(name) {
    this
      .find()
      .where('name', name)
      .where('del', false)
      .exec(function(err, response) {
          callback(null, response[0]);
      });

  } else {
    this
    .find()
    .where('del', false)
    .exec(callback);
  }
};

ProductSchema.statics.post = function(req, api, callback) {
  var data, post;
  data = _.pick(req.body, ['name','title', 'description']);
  post = new this(data);
  post.save(callback);

};

ProductSchema.statics.put = function(req, api, callback) {
  var name, update, data, options, post;
  name = req.param('name');

  if (!name) return callback('Cannot update without name');

  update = {name: name};
  data = _.pick(req.body, ['name','title', 'description']);
  options = {};

  this.update(update, data, options, callback);
};

ProductSchema.statics.delete = function(req, api, callback) {
  var name = req.param('name');
  if (!name) return callback('Cannot delete without name');

  this.update({name: name}, {del: true}, callback);

};

var models = {};
models.products = mongoose.model('Product', ProductSchema);

function callbackFactory(callback) {
  return function(err, response) {
    callback(err, { statusCode: 200 }, response);
  }

}

module.exports = function(adapterConfig) {
  _.extend(models, adapterConfig.models);
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
      var model = pathModel && pathModel.length ? pathModel[1].toLowerCase() : '';
      var method = api.method.toLowerCase();
      console.log('fetching: ', model, method);
      if(models[model] && models[model][method]) {
        models[model][method](req, api, callbackFactory(callback));
      } else {
        callback('method_missing');
      }
    }
  };
};
