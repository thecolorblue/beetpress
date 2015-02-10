var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  express = require('express'),
  rendr = require('rendr'),
  mongoose = require('mongoose'),
  _ = require('underscore'),
  app = express(),
  multer = require('multer'),
  mediaHandler = require('./server/media.js'),
  data_adapter = require('./server/data_adapter/beetpress.js');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var mongoStore = require('connect-mongo')(session);

var testing;

process.argv.forEach(function (val) {
  if(val === '--test' || val === '-t')
    testing = true;
});
/**
 * Initialize Express middleware stack.
 */
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.use(express.bodyParser());

/* setup authentication */
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   var User = mongoose.model('User');
//   User.load({ criteria: { _id: id } }, function (err, user) {
//     done(err, user);
//   });
// });

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     var User = mongoose.model('User');
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect.' });
//       }
//       if (!user.authenticate(password)) {
//         return done(null, false, { message: 'Incorrect.' });
//       }
//       return done(null, user);
//     });
//   }
// ));


// app.use(cookieParser());
// app.use(cookieSession({
//   secret: 'supersecret'
// }));
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: 'super secret session secret',
//   store: new mongoStore({
//     url: process.env.BPMONGODB || 'mongodb://localhost/beetpress',
//     collection : 'sessions'
//   })
// }));
// function ensureAuthenticated(req, res, next) {
//   console.log('authenticate:', req.isAuthenticated());
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/');
// }

// // use passport session
// app.use(passport.initialize());
// app.use(passport.session());

/**
 * Initialize our Rendr server.
 */

 // customize viewEngine to handle authentication
// ViewEngine.prototype.render = function render(viewPath, data, callback) {
//   var app, layoutData;

//   data.locals = data.locals || {};
//   app = data.app;
//   layoutData = _.extend({}, data, {
//     body: this.getViewHtml(viewPath, data.locals, app),
//     appData: app.toJSON(),
//     bootstrappedData: this.getBootstrappedData(data.locals, app),
//     _app: app
//   });
//   if(data.req.user) {
//     layoutData.user = data.req.user;
//   }
//   this.renderWithLayout(layoutData, app, callback);
// };

/* register handlebar helpers */
// console.log(require('rendr-handlebars')({ entryPath: '/Volumes/Data/applications/beetpress/' }));
// .registerHelpers(require('./shared/helpers'));


/* authentication routes */
// app.post('/auth/local',
//   passport.authenticate('local', { successRedirect: '/sucess',
//                                       failureRedirect: '/failed' }));

// app.post('/auth/user/create', function(req, res) {
//   var User = mongoose.model('User');
//   User.find({
//     username: req.body.username
//   })
//   .exec(function(err, user) {
//     if(user.length !== 0) {
//       res.json({
//         message: 'username taken'
//       });
//     } else {
//       req.body.provider = 'local';
//       User.create(req.body, function(err, response) {

//         res.json(err || _.pick(response, 'username', 'email', 'name', '_id'));
//       });
//     }
//   });
// });
// app.get('/auth/login', function(req, res) {
//   res.send('' +
// '    <section>' +
// '      <form action="/auth/local" method="post">' +
// '          <div>' +
// '              <label>Username:</label>' +
// '              <input type="text" name="username"/>' +
// '          </div>' +
// '          <div>' +
// '              <label>Password:</label>' +
// '              <input type="password" name="password"/>' +
// '          </div>' +
// '          <div>' +
// '              <input type="submit" value="Log In"/>' +
// '          </div>' +
// '      </form>' +
// '    </section>');
// });
// app.get('/auth/logout', function(req, res){
//   console.log('logging out');
//   req.logout();
//   res.redirect('/');
// });

// // file uploads
// app.use(multer({ dest: './public/images' }));
// app.post('/media/upload', mediaHandler);

// not sure where this should go
// this should not be a part of the regular api
// as we will not be caling this from a model
app.post('/checkout/:product', function(req, res) {
  var Cart = data_adapter.models.Cart;
  var User = data_adapter.models.User;
  var Store = data_adapter.models.Store;
  var Product = data_adapter.models.Product;

  var model = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    products: [req.body.product]
  };

  // do validation here
  (new Cart(model))
    .save(function(err, cart) {

      // find the user and add the cart to their account
      User.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { orders: cart._id },
        },
        // if the user has not registered yet, create a new user
        { upsert: true },
        function(err, user) {
          if(user.isNew) {
            user.update({
              phone: req.body.phone,
              name: req.body.name
            }, function(err) { if(err) console.log(err); });
          }
          res.json(err || cart);
      });

      // add the product to the cart
      Product.findById(req.body.product)
        .populate('producer')
        .exec(function(err, product) {
          cart.update({
            $push: {
              stores: product.producer._id
            }
          }, function(err) { if(err) console.log(err); })
      });
    });
});

// var models = {
//   User: require('./user_model'),
//   Product: ,
//   Event: require('./event_model'),
//   Store: require('./store_model'),
//   Cart: require('./cart_model')
// };
// var adapterFolder = __dirname + '/server/data_adapter/';

// restful.model('Product', require(adapterFolder + 'product_model'))
//   .methods(['get', 'post', 'put', 'delete'])
//   .register(app, '/api/products');
// restful.model('User', require(adapterFolder + 'user_model'))
//   .methods(['get', 'post', 'put', 'delete'])
//   .register(app, '/api/users');
// restful.model('Event', require(adapterFolder + 'event_model'))
//   .methods(['get', 'post', 'put', 'delete'])
//   .register(app, '/api/events');
// restful.model('Store', require(adapterFolder + 'store_model'))
//   .methods(['get', 'post', 'put', 'delete'])
//   .route('mine', function(req, res, next) {
//     console.log('current user:', req.user);
//     req.query['owners'] = req.user._id;
//   })
//   .register(app, '/api/stores');
// restful.model('Cart', require(adapterFolder + 'cart_model'))
//   .methods(['get', 'post', 'put', 'delete'])
//   .register(app, '/api/carts');

app.use(rendr.createServer({
  dataAdapter: data_adapter({
    url: process.env.BPMONGODB
  })
}));

/**
 * Start the Express server.
 */
function start(){
  var port = process.env.PORT || 3030;
  app.listen(port);
  console.log('server pid %s listening on port %s in %s mode',
    process.pid,
    port,
    app.get('env')
  );
}


/**
 * Only start server if this script is executed, not if it's require()'d.
 * This makes it easier to run integration tests on ephemeral ports.
 */
if (require.main === module) {
  start();
}

exports.app = app;
