var BaseView = require('../base'),
  _ = require('underscore');

module.exports = BaseView.extend({
  
  className: 'products_edit_view',
  
  events: {
  	'keyup input' : 'updateModel',
    'click .add-ingredient': 'addIngredient',
    'click .submit-image' : 'uploadFile',
  	'click .submit' : 'updateProduct'
  },

  addIngredient: function(e) {
    if(e) { e.preventDefault(); }
    var ings = _.clone(this.model.get('ingredients'));
    ings.push({
      name: 'example',
      description: 'example description'
    });

    this.model.set('ingredients', ings);

    this.render();
  },

  uploadFile: function(e) {
    if(e){ e.preventDefault(); }
    var _this = this;
    var data = new FormData();
    data.append('thumbnail', $(e.target).parent().find('[name="image"]')[0].files[0]);
    data.append('product_id', _this.model.get('_id'));

    $.ajax({
      url: '/media/upload',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false, // Don't process the files
      contentType: false, // Set content type to false as jQuery will tell the server its a query string request
      success: function(data, textStatus, jqXHR) {
        if(typeof data.error === 'undefined') {
          var media = _this.model.get('media') || [];
          _this.model.set('media', media.push(data));
        } else {
          // Handle errors here
          console.log('ERRORS: ' + data.error);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle errors here
        console.log('ERRORS: ' + textStatus);
        // STOP LOADING SPINNER
      }
    });
  },

  updateProduct: function(e) {
  	var view = this;
  	if(e) e.preventDefault();

  	var updates = {
      name: convertToSlug($('#title', this.$el).val()),
      title: $('#title', this.$el).val(),
  		description: $('#description', this.$el).val(),
      producer: this.model.get('producer')._id,
      ingredients: this._getIngredients()
  	};

  	this.model.save(updates, {
      patch: true,
  		success: function() {
  			view.app.router.redirectTo('/' + view.model.get('producer_username') + '/' + view.model.get('name'), { pushState: false });
  		}
  	});

    function convertToSlug(title) {
      return title .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-');
    }

  },

  _getIngredients: function() {
    var ingredients = [];

    this.$el.find('[data-index]').each(function(i, el) {
      var $el = $(el);
      var index = $el.attr('data-index') * 1;

      ingredients[index] = {
        name: $el.find('[name="name"]').val(),
        description: $el.find('[name="description"]').val()
      };
    });

    return ingredients;
  }

});
module.exports.id = 'products/edit';