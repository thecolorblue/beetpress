module.exports = function(match) {
  match('',                      'home#index');
  match('products',              'products#index');
  match('products/:name',        'products#show');
  match('products/:name/edit',   'products#edit');
};
