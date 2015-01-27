var expect = require('chai').expect,
  isServer = (typeof window === 'undefined');

if(isServer) {
	var DataAdapter = require('../../../server/data_adapter/beetpress');

	describe('Data Adapter', function() {
		beforeEach(function() {
			this.adapter = DataAdapter({}); // defaults to localhost
		});

		it('should have models attached', function() {
			expect(this.adapter.models).to.be.an('object');
		});

		it('should have get/post/put/delete methods for each model', function() {
			var methods = ['get', 'post', 'put', 'delete'];
			for(var i in this.adapter.models) {
				methods.forEach(function(method) {
					expect(this.adapter.models[method]).to.be.a('function');
				});
			}
		});

	});	
}  
