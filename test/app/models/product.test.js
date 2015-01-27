var expect = require('chai').expect,
  isServer = (typeof window === 'undefined'),
  Product = require('../../../app/models/product'),
  Store = require('../../../app/models/store'),
  App = (require('../../../app/app'));

describe('Product', function() {
	beforeEach(function() {
		this.app = new App();
		this.app.fetcher.modelStore.clear();
		this.model = Product;
		this.model.id = 'model';
	});
});
