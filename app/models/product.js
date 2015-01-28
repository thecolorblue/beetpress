var Base = require('./base'),
	_ = require('underscore');

module.exports = Base.extend({
  url: '/:producer_username/:name',
  api: 'beetpress',
  idAttribute: '_id',
  parse: function(response, options) {
  	console.log('parse options: ', arguments);
  	return response ? _.extend(response, { producer_username: response._id ? response.producer.username : response.producer }) : _.extend(this.defaults, response, {
  		name: options ? options.data.name : '',
  		producer_username: options ? options.data.producer : ''
  	});
  }
  // constructor: function(model) {
  // 	console.log('product defaults:', this.attributes, this.defaults);
  // 	_.extend(this.attributes, this.defaults);
  // 	this.set('producer_username', model.producer.username);

  // 	Base.apply(this, arguments);
  // }
});
module.exports.id = 'Product';
