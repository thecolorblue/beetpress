var BaseView = require('../base');

module.exports = BaseView.extend({
  
  className: 'stores_edit_view',
  
  events: {
  	'keyup input' : 'updateModel',
    'change .submit-image' : 'uploadFile',
  	'submit form' : 'updateProduct'
  },

  uploadFile: function(e) {
    if(e){ e.preventDefault(); }

    var data = new FormData();
    $.each(e.target.files, function(key, value) {
      data.append(key, value);
    });

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false, // Don't process the files
      contentType: false, // Set content type to false as jQuery will tell the server its a query string request
      success: function(data, textStatus, jqXHR) {
        if(typeof data.error === 'undefined') {
          // Success so call function to process the form
          submitForm(event, data);
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

  updateStore: function(e) {
  	var view = this;
  	if(e) e.preventDefault();

    var updates = {
      name: convertToSlug($('#title', this.$el).val()),
      title: $('#title', this.$el).val(),
      description: this.$el.find('textarea').val(),
      producer_username: this.model.get('producer').username
    };

    this.model.save(updates, {
      patch: true,
      method: 'post',
      success: function() {
        view.app.router.redirectTo('/products/' + view.model.get('name'), { pushState: false });
      }
    });

    function convertToSlug(title) {
      return title .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-');
    }

  }

});
module.exports.id = 'stores/edit';