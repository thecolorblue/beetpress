var app = require('../app/app')

module.exports = function(Handlebars) {
	var loggedIn = false;
	var user;
  return {
  	setUser: function(_user) {
  		user = _user;
  		return '';
  	},
    anonymous: function(options) {
      return !user ? options.fn(this) : '';
    },
    user: function(options) {
      return !!user ? options.fn(this) : '';
    },
    admin: function(options) {
      return (user || {}).isAdmin ? options.fn(this) : '';
    }
  };	
};