module.exports = function(match) {
  match('',                      'home#index');
  match('products',              'products#index');
  match('products/create',       'products#create');
  match('products/:name',        'products#show');
  match('products/:name/edit',   'products#edit');
  match('auth/:name',            'home#auth');
  match('store/create',          'stores#create');
  match(':producer/:name',       'products#show');
  match(':producer',       		 'products#index');
};
