var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    _ = require('underscore'),
    ProductSchema;

/* Schemas */
ProductSchema = new Schema({
  title: String,
  body: String,
  date: Date,
  del: Boolean
}, { strict: true });

ProductSchema.path('title').required(true).index(true);
ProductSchema.path('body').required(true);
ProductSchema.path('date').default(Date.now);
ProductSchema.path('del').default(false);

ProductSchema.pre('save', function (next) {
  // Do something.
  next();
});

ProductSchema.statics.get = function(req, api, callback) {
  var id = req.param('id');
  if (id) {
    this.findById(id).exec(callback);
  } else {
    this
    .find()
    .where('del', false)
    .exec(callback);
  }
};

ProductSchema.statics.post = function(req, api, callback) {
  var data, post;
  data = _.pick(req.body, ['title', 'body']);

  post = new this(data);
  post.save(callback);

};

ProductSchema.statics.put = function(req, api, callback) {
  var id, update, data, options, post;
  id = req.param('id');

  if (!id) return callback('Cannot update without id');

  update = {_id: id};
  data = _.pick(req.body, ['title', 'body']);
  options = {};

  this.update(update, data, options, callback);
};

ProductSchema.statics.del = function(req, api, callback) {
  var id = req.param('id');
  if (!id) return callback('Cannot delete without id');

  this.update({_id: id}, {del: true}, callback);

};

Product = mongoose.model('Product', ProductSchema);

module.exports = {
	request: function(req, api, options, callback) {
		console.log(api, options);
		callback([{},{}]);
	}
};