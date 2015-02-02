var Base = require('./base'),
	_ = require('underscore');

module.exports = Base.extend({
  url: '/:producer_username/:name',
  api: 'beetpress',
  idAttribute: '_id',
  parse: function(response, options) {
  	return response ? _.extend(response, { producer_username: response._id ? response.producer.username : response.producer }) : _.extend(this.defaults, response, {
  		name: options ? options.data.name : '',
  		producer_username: options ? options.data.producer : ''
  	});
  }
});
module.exports.id = 'Product';
