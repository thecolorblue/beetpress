var BaseView = require('../base'),
  Store = require('../../models/store');

module.exports = BaseView.extend({
  
  className: 'stores_create_view',
  
  events: {
  	'keyup input' : 'updateModel',
    'change .submit-image' : 'uploadFile',
  	'submit form' : 'updateStore'
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

    var store = new Store({
      name: $('#name', this.$el).val(),
      email: $('#email', this.$el).val(),
      username: $('#username', this.$el).val(),
    }, {
      app: this.app
    });
    store.save().success(function() {
      view.app.router.redirectTo('/products/', { pushState: false });
    });
  }

});
module.exports.id = 'stores/create';