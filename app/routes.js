module.exports = function(match) {
  match('',               'home#index');
  match('confirmation',   'home#confirmation');
  match('about',          'home#about');
  match('products',       'products#index');
  match('products/:name', 'products#show');
  match('auth/:name',     'home#auth');
  match('checkout/:name', 'products#checkout');
  match(':producer/:name','products#show');
  match(':producer',      'products#index');
};
