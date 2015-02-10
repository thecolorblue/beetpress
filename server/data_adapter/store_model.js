var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    StoreSchema;

/* Schemas */
StoreSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: Date,
  del: Boolean
});

StoreSchema.path('name').required(true).index(true);
StoreSchema.path('email').required(true).index(true);
StoreSchema.path('username').required(true).index(true);
StoreSchema.path('date').default(Date.now);
StoreSchema.path('del').default(false);

StoreSchema.statics.get = function(model, callback) {
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

StoreSchema.statics.post = function(model, callback) {
  this
    .create(model)
    .then(function(response) {
      callback(null, response);
    },callback);
};

StoreSchema.statics.put = function(model, callback) {
  if (!model.name) return callback('Cannot update without name');

  this.update( {name: model.name}, model, {}, callback);
};

StoreSchema.statics.delete = function(model, callback) {
  if (!model.name) return callback('Cannot delete without name');

  this.update({name: model.name}, {del: true}, callback);

};

module.exports = StoreSchema;
