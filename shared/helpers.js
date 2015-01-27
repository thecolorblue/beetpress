var app = require('../app/app'),
  isServer = (typeof window === 'undefined');

module.exports = function(Handlebars) {
	var loggedIn = false;
	var user;
  return {
  	setUser: function(_user) {
      console.log(_user, app);
  		user = _user;
  		return '';
  	},
    anonymous: function(options) {
      console.log(getUser());
      return !getUser() ? options.fn(this) : '';
    },
    user: function(options) {
      return getUser() ? options.fn(this) : '';
    },
    store: function(options) {
      return getUser() ? options.fn(this) : '';
    },
    admin: function(options) {
      return getUser() ? options.fn(this) : '';
    },
    owner: function(product, options) {
      // render if current user is the creator of this product
      return getUser() ? options.fn(this) : '';
    },
    jsonUser: function() {
      return JSON.stringify(user, null, 4);
    }
  };	
  function getUser() {
    return isServer ? user : window.User;
  }
};