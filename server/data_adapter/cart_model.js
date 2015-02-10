var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    CartSchema;

/* Schemas */
CartSchema = new Schema({
  stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
  email: String,
  phone: String,
  name: String,
  date: {type: Date, default: Date.now }
});

CartSchema.statics.get = function(model, callback) {
  if (model.id) {
    this
      .findById(model.id)
      .exec(callback);
  } else if(model.name) {
    this
      .find()
      .where('name', model.name)
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

CartSchema.statics.post = function(model, callback) {
  this
    .create(model)
    .then(function(response) {
      callback(null, response);
    },callback);
};

CartSchema.statics.put = function(model, callback) {
  if (!model.name) return callback('Cannot update without name');

  this.update( {name: model.name}, model, {}, callback);
};

CartSchema.statics.delete = function(model, callback) {
  if (!model.name) return callback('Cannot delete without name');

  this.update({name: model.name}, {del: true}, callback);

};

module.exports = CartSchema;
