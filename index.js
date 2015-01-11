var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , express = require('express')
  , rendr = require('rendr')
  , mongoose = require('mongoose')
  , adapter = require('./server/data_adapter/beetpress.js')
  , _ = require('underscore')
  , ViewEngine = require('./node_modules/rendr/server/viewEngine')
  , app = express();


var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var mongoStore = require('connect-mongo')(session);
var User = mongoose.model('User');

/**
 * Initialize Express middleware stack.
 */
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.use(express.bodyParser());

/* setup authentication */
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id } }, function (err, user) {
      done(err, user);
    });
  });

passport.use(new FacebookStrategy({
    clientID: '397230800443804',
    clientSecret: 'fb974bc0c08e49b6237edb7b2ba6eb97',
    callbackURL: "http://localhost:3030/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.load({
      criteria: { 'facebook.id': profile.id }
    }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
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
      url: 'mongodb://localhost/bpsessions',
      collection : 'sessions'
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

/**
 * In this simple example, the DataAdapter config, which specifies host, port, etc. of the API
 * to hit, is written inline. In a real world example, you would probably move this out to a
 * config file. Also, if you want more control over the fetching of data, you can pass your own
 * `dataAdapter` object to the call to `rendr.createServer()`.
 */
var dataAdapterConfig = {
  'beetpress': {
    // url: 'mongodb://localhost/beetpress'
  }
};

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
  dataAdapter: adapter({}),
  viewEngine: new ViewEngine()
});

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
  }
  next();
});
app.use(server);


/* authentication routes */
app.get('/auth/facebook', passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me']
    }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

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
