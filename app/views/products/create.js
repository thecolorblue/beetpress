var BaseView = require('../base'),
  Product = require('../../models/product');

module.exports = BaseView.extend({
  className: 'products/create',
  events: {
  	'submit form' : 'submit'
  },
  submit: function(e) {
  	var view = this;
  	if(e)
      e.preventDefault();

    var producerUsername = $('#producer option:selected', this.$el).attr('val');
    var producer = this.collection.find(function(i) {
      if(i.get('username') === producerUsername)
        return i;
    });
  	var product = new Product({
      name: convertToSlug($('#title', this.$el).val()),
      title: $('#title', this.$el).val(),
      description: $('#description', this.$el).val(),
      producer: producer.get('_id'),
      producer_username: producerUsername
    }, {
      app: this.app
    });
    product.save().success(function() {
      view.app.router.redirectTo('/products/', { pushState: false });
    });

    function convertToSlug(title) {
      return title .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-');
    }
  }
});
module.exports.id = 'products/create';

