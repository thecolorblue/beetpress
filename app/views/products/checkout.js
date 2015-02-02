var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'checkout_view',
  events: {
  	'click #submit': 'submit'
  },
  submit: function(e) {
  	if(e)
  	  e.preventDefault();

  	var view = this;

  	// post /checkout
  	$.ajax({
  		type: 'post',
  		url: '/checkout/' + this.model.get('name'),
  		data: {
  			name: $('#name', this.$el).val(),
  			phone: $('#phone', this.$el).val(),
  			email: $('#email', this.$el).val(),
  			product: this.model.get('_id')
  		},
  		success: function(res) {
  			view.app.router.redirectTo('/confirmation', { pushState: false });
  		},
  		fail: function() {}
  	})
  }
});
module.exports.id = 'products/checkout';
