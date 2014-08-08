// Location: /config/passport.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id })
    .exec(function (err, user) {
      done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username })
        .exec(function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message: 'Incorrect username!' }); }
          bcrypt.compare(password, user.password, function(err, res) {
            if (!res) return done(null, false, { message: 'Incorrect password!'});
            return done(null, user);
          });
        });
    })
);

//module.exports = {
//  express: {
//    customMiddleware: function(app){
//      console.log('express midleware for passport');
//      app.use(passport.initialize());
//      app.use(passport.session());
//    }
//  }
//};