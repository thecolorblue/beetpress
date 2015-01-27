var Base = require('./base');

module.exports = Base.extend({
  url: '/event',
  api: 'beetpress',
  idAttribute: '_id'
});

module.exports.id = 'Event';
