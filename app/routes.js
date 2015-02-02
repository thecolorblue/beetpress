module.exports = function(match) {
  match('',                    'home#index');
  match('confirmation',        'home#confirmation');
  match('products',            'products#index');
  match('products/create',     'products#create');
  match('products/:name',      'products#show');
  match('products/:name/edit', 'products#edit');
  match('auth/:name',          'home#auth');
  match('checkout/:name',      'products#checkout');
  match('store/create',        'stores#create');
  match(':producer/:name',     'products#show');
  match(':producer',       		 'products#index');
};
