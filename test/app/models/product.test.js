var expect = require('chai').expect,
  Product = require('../../../app/models/product');

describe('Product', function() {
  beforeEach(function() {
    this.model = new Product({
      title: 'Test Product',
      name: 'test-product',
      description: 'this is a test product.'      
    });
  });
});
