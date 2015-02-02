module.exports = {
  index: function(params, callback) {
    this.app.set('title', 'Home');
    callback();
  },
  auth: function(params, callback) {
  	document.location = '/auth/' + params.name;
  },
  confirmation: function(params, callback) {
  	this.app.set('Order Processed -- Thank You!')
  	callback(null, 'home/confirmation');
  }
};
