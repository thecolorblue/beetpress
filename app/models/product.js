var Base = require('./base');

module.exports = Base.extend({
  url: '/products?name=:name',
  api: 'beetpress',
  idAttribute: '_id'
});
module.exports.id = 'Product';
