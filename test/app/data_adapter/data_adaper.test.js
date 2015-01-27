var expect = require('chai').expect,
  isServer = (typeof window === 'undefined');

if(isServer) {
	var DataAdapter = require('../../../server/data_adapter/beetpress');

	describe('Data Adapter', function() {
		before(function() {
			this.adapter = DataAdapter({}); // defaults to localhost
		});

		after(function() {
			this.adapter.mongoose.disconnect();
		})

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

		it('should create a store', function(done) {
			var store = {
				name: 'Acme',
				email: 'admin@acme.com',
				username: 'acme'
			};
			this.adapter.request({
				body: store
			}, {
				path: '/store',
				method: 'POST'
			}, {}, function(err, status, model) {
				console.log('test');
				expect(model).to.equal(store);
				done();
			})
		});

	});	
}  
