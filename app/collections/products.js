var Product = require('../models/product')
  , Base = require('./base');

module.exports = Base.extend({
  model: Product,
  url: '/products/'
});
module.exports.id = 'Products';
