var Base = require('./base');

module.exports = Base.extend({
  url: '/:producer_username/:name',
  api: 'beetpress',
  idAttribute: '_id'
});
module.exports.id = 'Product';
