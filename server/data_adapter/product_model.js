var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    ProductSchema;

/* Schemas */
ProductSchema = new Schema({
  title: String,
  name: String,
  description: String,
  producer: { type: Schema.Types.ObjectId, ref: 'Store' },
  meta: Schema.Types.Mixed,
  media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  date: Date,
  del: Boolean
});

ProductSchema.path('name').required(true).index(true);
ProductSchema.path('title').required(true).index(true);
ProductSchema.path('producer').required(true).index(true);
ProductSchema.path('description').required(true);
ProductSchema.path('date').default(Date.now);
ProductSchema.path('del').default(false);
ProductSchema.virtual('producer_username', function() {
  return this.producer.username;
})

ProductSchema.statics.get = function(model, callback) {
  if (model._id) {
    this
      .findById(model._id)
      .populate('producer')
      .populate('media')
      .exec(callback);
  } else if(model.name) {
    this
      .find()
      .where('name', model.name)
      .populate('producer')
      .populate('media')
      .where('del', false)
      .exec(function(err, response) {
          console.log(response);
          callback(null, response[0]);
      });

  } else {
    this
    .find()
    .populate('producer')
    .populate('media')
    .where('del', false)
    .exec(callback);
  }
};

ProductSchema.statics.post = function(model, callback) {
  this
    .create(model)
    .then(function(response) {
      callback(null, response);
    },function(error) {
      callback(error);
    });
};

ProductSchema.statics.put = function(model, callback) {
    if (!model.name) return callback('Cannot update without name');

    this.update({name: model.name}, model, {}, callback);
};

ProductSchema.statics.delete = function(model, callback) {
  if (!model.name) return callback('Cannot delete without name');

  this.update({name: model.name}, {del: true}, callback);
};

module.exports = mongoose.model('Product', ProductSchema);
