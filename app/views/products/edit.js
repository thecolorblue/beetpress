var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'products_edit_view',
  events: {
  	'keyup input' : 'updateModel',
  	'submit form' : 'updateProduct'
  },
  updateModel: function() {},
  updateProduct: function(e) {
  	var view = this;
  	if(e) e.preventDefault();

  	var updates = {
  		description: this.$el.find('textarea').val()
  	};

  	this.model.save(updates, {
  		success: function() {
  			view.app.router.redirectTo('/products/' + view.model.get('name'), { pushState: false });
  		}
  	})
  }
});
module.exports.id = 'products/edit';