var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    EventSchema;

/* Schemas */
EventSchema = new Schema({
  name: String,
  target: Schema.Types.Mixed,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  meta: Schema.Types.Mixed,
  date: Date,
  del: Boolean
});

EventSchema.path('name').required(true).index(true);
EventSchema.path('target').required(true).index(true);
EventSchema.path('creator').required(true).index(true);
EventSchema.path('date').default(Date.now);
EventSchema.path('del').default(false);

EventSchema.statics.get = function(model, callback) {
  if (model.id) {
    this
      .findById(model.id)
      .populate('creator')
      .exec(callback);
  } else if(model.name) {
    this
      .find()
      .where('name', model.name)
      .populate('creator')
      .where('del', false)
      .exec(function(err, response) {
          callback(null, response[0]);
      });
  } else {
    this
    .find()
    .limit(100)
    .where('del', false)
    .exec(callback);
  }
};

EventSchema.statics.post = function(model, callback) {
  this
    .create(model)
    .then(function(response) {
      callback(null, response);
    },function(error) {
      callback(error);
    });
};

EventSchema.statics.put = function(model, callback) {
  if (!model.name) return callback('Cannot update without name');

  this.update({name: model.name}, model, {}, callback);
};

EventSchema.statics.delete = function(model, callback) {
  if(!model.name) return callback('Cannot delete without name');

  this.update({name: model.name}, {del: true}, callback);

};

module.exports = EventSchema;
