require('chai');
var ProductView = require('../../../app/views/products/show')
	Product = require('../../../app/models/product')
  , App = require('../../../app/app')
;

describe('ProductView', function() {
  var product;

  beforeEach(function() {
    this.app = new App({rootPath: '/'});
    product = new Product({});
  });

  it('should show ingredients', function() {});
  it('should show all of the actions', function() {});
  it('should run the actions when clicked', function() {});
  it('should include the open graph tags', function() {});
  it('should add the schema.org attributes', function() {});

  // it('should have repos data in getTemplateData', function() {
  //   var repos = [{foo: 'bar'}];
  //   var view = new ProductView({ repos: repos, app: this.app });
  //   var data = view.getTemplateData();
  //   data.should.have.property('repos', repos);
  // });

});
