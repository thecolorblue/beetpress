var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'products/tiny_products',
  events: {
  	'click button.remove': 'removeProduct'
  },
  removeProduct: function(e) {
  	var view = this;
  	if(e) e.preventDefault();

  	this.model.destroy({
  		success: function() {
  			view.render();
  		}
  	});
  }
});
module.exports.id = 'products/tiny_products';
