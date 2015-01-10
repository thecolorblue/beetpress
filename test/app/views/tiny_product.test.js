var expect = require('chai').expect, 
  $ = require('jquery'),
  TinyView = require('../../../app/views/products/tiny_products'),
  Product = require('../../../app/models/product'),
  App = require('../../../app/app');

describe('TinyView', function() {

  before(function () {
    // Create test fixture.
  });

  beforeEach(function () {
    // Empty out and rebind the fixture for each run.

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

  afterEach(function () {
    // Destroying the model also destroys the view.
    this.view.model.destroy();
  });

  after(function () {
    // Remove all sub-fixtures after test suite finishes.
    // $("#fixtures").empty();
  });

  it('should delete the model', function() {
    // console.log(this.view.getHtml());
    // var data = this.view.getTemplateData();
    // this.view.delete({preventDefault: function() {} });
    // console.log(this.view.model);
    // expect(this.view.el.find('a').text()).to.equal('test-product');
  });
  it('should show the description', function() {});

  // it('should have repos data in getTemplateData', function() {
  //   var repos = [{foo: 'bar'}];
  //   var view = new TinyView({ repos: repos, app: this.app });
  //   var data = view.getTemplateData();
  //   data.should.have.property('repos', repos);
  // });

});

