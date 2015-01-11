var expect = require('chai').expect,
  Products = require('../../../app/collections/products');

describe('Products', function() {
  beforeEach(function() {
    this.collection = new Products([{
      title: 'Test Product',
      name: 'test-product',
      description: 'this is a test product.'      
    }]);
  });
});
