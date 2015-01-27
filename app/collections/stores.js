var Store = require('../models/store')
  , Base = require('./base');

module.exports = Base.extend({
  model: Store,
  url: '/stores'
});
module.exports.id = 'Products';
