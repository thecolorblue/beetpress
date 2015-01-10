var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'products_index_view',
  events: {
  	'submit form' : 'submit'
  },
  submit: function(e) {
  	var view = this;
  	function convertToSlug(title) {
	    return title .toLowerCase()
	        .replace(/[^\w ]+/g,'')
	        .replace(/ +/g,'-');
	  }

  	e.preventDefault();
  	var product = {
  		name: convertToSlug($('#title', this.$el).val()),
  		title: $('#title', this.$el).val(),
  		description: $('#description', this.$el).val()
  	};
  	this.collection.create(product, {
  		success: function() {
	  		view.render();
	  	}
  	});
  }
});
module.exports.id = 'products/index';
