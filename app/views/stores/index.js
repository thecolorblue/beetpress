var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'stores_index_view',
  events: {
  	'submit form' : 'submit'
  },
  submit: function(e) {
  	var view = this;
  	if(e)
      e.preventDefault();

  	this.collection.create({
      name: convertToSlug($('#name', this.$el).val()),
      email: $('#email', this.$el).val(),
      username: convertToSlug($('#name', this.$el).val())
    }, {
  		success: function() {
	  		view.render();
	  	}
  	});

    function convertToSlug(title) {
      return title.toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-');
    }
  }
});
module.exports.id = 'stores/index';
