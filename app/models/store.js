var Base = require('./base');

module.exports = Base.extend({
  url: '/stores/:username',
  api: 'beetpress',
  idAttribute: '_id'	
});

module.exports.id = 'Store';
