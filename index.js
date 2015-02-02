var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , express = require('express')
  , rendr = require('rendr')
  , mongoose = require('mongoose')
  , _ = require('underscore')
  , ViewEngine = require('./node_modules/rendr/server/viewEngine')
  , app = express()
  , multer = require('multer')
  , mediaHandler = require('./server/media.js')
  , data_adapter = require('./server/data_adapter/beetpress.js');

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
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var User = mongoose.model('User');
  User.load({ criteria: { _id: id } }, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENTID,
    clientSecret: process.env.FB_SECRET,
    callbackURL:
      (process.env.NODE_ENV === 'production'
        ? 'http://local.pearmarket.co:3030' :
        'https://order.pearmarket.co')
      + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    var User = mongoose.model('User');
    User.load({
      criteria: { 'facebook.id': profile.id }
    }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username || profile.emails[0].value,
          provider: 'facebook',
          facebook: profile._json
        });
        user.save(function (err) {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });

  }
));

app.use(cookieParser());
app.use(cookieSession({ secret: 'supersecret' }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'super secret session secret',
  store: new mongoStore({
    url: process.env.BPMONGODB || 'mongodb://localhost/beetpress',
    collection : 'sessions'
  })
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());


/**
 * Initialize our Rendr server.
 */

 // customize viewEngine to handle authentication
ViewEngine.prototype.render = function render(viewPath, data, callback) {
  var app, layoutData;

  data.locals = data.locals || {};
  app = data.app;
  layoutData = _.extend({}, data, {
    body: this.getViewHtml(viewPath, data.locals, app),
    appData: app.toJSON(),
    bootstrappedData: this.getBootstrappedData(data.locals, app),
    _app: app
  });

  if(data.req.user) {
    layoutData.user = data.req.user;
  }
  this.renderWithLayout(layoutData, app, callback);
};
var server = rendr.createServer({
  dataAdapter: data_adapter({
    url: process.env.BPMONGODB
  }),
  viewEngine: new ViewEngine()
});

/* register handlebar helpers */
// console.log(require('rendr-handlebars')({ entryPath: '/Volumes/Data/applications/beetpress/' }));
// .registerHelpers(require('./shared/helpers'));


/**
  * To mount Rendr, which owns its own Express instance for better encapsulation,
  * simply add `server` as a middleware onto your Express app.
  * This will add all of the routes defined in your `app/routes.js`.
  * If you want to mount your Rendr app onto a path, you can do something like:
  *
  *     app.use('/my_cool_app', server);
  */
app.use(function(req, res, next) {
  if(req.user) {
    req.app.user = req.user;
  } else {
    req.app.user = null;
  }
  next();
});


/* authentication routes */
app.get('/auth/facebook', passport.authenticate('facebook', {
      scope: ['email','public_profile']
    })
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/auth/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

// file uploads
app.use(multer({ dest: './public/images' }));
app.post('/media/upload', mediaHandler);

// not sure where this should go
// this should not be a part of the regular api
// as we will not be caling this from a model
app.post('/checkout/:product', function(req, res) {
  var Cart = data_adapter.models.Cart;
  var User = data_adapter.models.User;
  var Store = data_adapter.models.Store;
  var Product = data_adapter.models.Product;
  // {
  //   name: $('#name', this.$el).val(),
  //   phone: $('#phone', this.$el).val(),
  //   email: $('#email', this.$el).val(),
  //   product: this.model.get('_id')
  // }
  var model = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    products: [req.body.product]
  };
  console.log(model);
  // do validation here
  (new Cart(model))
    .save(function(err, cart) {
      console.log(cart);
      User.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { orders: cart._id },
        },
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

/* setup faux user for testing */
if(testing) {
  console.log('test mode');
  app.post('/test/user', function(req, res) {
    req.user = req.body;
    res.json(req.body);
  });
}

app.use(server);
/**
 * Start the Express server.
 */
function start(){
  var port = process.env.PORT || 3030;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
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
