module.exports = function(match) {
  match('',                      'home#index');
  match('repos',                 'repos#index');
  match('repos/:owner/:name',    'repos#show');
  match('products',              'products#index');
  match('products/:name',        'products#show');
  match('users'       ,          'users#index');
  match('users/:login',          'users#show');
};
