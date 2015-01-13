var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    ProductSchema;

/* Schemas */
ProductSchema = new Schema({
  title: String,
  name: String,
  description: String,
  creator: String,
  date: Date,
  del: Boolean
});

ProductSchema.path('name').required(true).index(true);
ProductSchema.path('title').required(true).index(true);
ProductSchema.path('creator').required(true).index(true);
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
  if(req.user) {
    (new this(_.extend({},req.body,{
      creator: req.user.id
    }))).save(callback);    
  } else {
    callback('not logged in');
  }
};

ProductSchema.statics.put = function(req, api, callback) {
  if(req.user) {
    var name = req.param('name');

    if (!name) return callback('Cannot update without name');

    this.update(
      {name: name},
      _.extend({}, req.body),
      {},
      callback);
  } else {
    callback('not logged in');
  }
};

ProductSchema.statics.delete = function(req, api, callback) {
  var name = req.param('name');
  if (!name) return callback('Cannot delete without name');

  this.update({name: name}, {del: true}, callback);

};
console.log('register product');
module.exports = mongoose.model('Product', ProductSchema);
