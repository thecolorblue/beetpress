var expect = require('chai').expect,
  isServer = (typeof window === 'undefined'),
  TinyView = require('../../../app/views/products/tiny_products'),
  Product = require('../../../app/models/product'),
  App = require('../../../app/app');

describe('TinyView', function() {

  beforeEach(function () {
    this.view = new TinyView({
      modelName: 'Product',
      model: new Product({
        title: 'Test Product',
        name: 'test-product',
        body: 'this is a test product.'
      }),
      app: new App({rootPath: '/'})
    });
  });

  if(!isServer) {
    // these actions will never be triggered on the server
    // so we don't have to worry about testing them

    // also, the client and server router API's are different
    // making these kinds of tests difficult
    it('should delete the model', function() {
      var view = this.view;
      var pastView = view.app.router.currentRoute;
      this.view.removeProduct();
      setTimeout(function() {
        expect(view.app.router.currentRoute).to.not.equal(pastView);
      },0);
    });
    it('should be editable', function() {
      var view = this.view;
      var pastView = view.app.router.currentFragment;
      this.view.editProduct();
      setTimeout(function() {
        expect(view.app.router.currentFragment).to.not.equal(pastView);
      },0);
    });
    it('should add to cart', function() {
      var view = this.view;
      var pastView = view.app.router.currentFragment;
      this.view.checkout();
      setTimeout(function() {
        expect(view.app.router.currentFragment).to.not.equal(pastView);
      },0);
    });    
  }
});

