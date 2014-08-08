/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

  login: function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/home');
    }
    res.view('login');
  },

  process: function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        sails.log.info('user login failed.');
        sails.log.info(info);
        return res.view('login', {
          message: info.message
        });
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        sails.log.info('user logged in successfully.');
        return res.redirect('/home');
      });
    })(req, res, next);
  },

  logout: function(req,res) {
    req.logout();
    sails.log.info('user logged out');
    res.redirect('/login');
  },

  _config: {
    actions: false
  }

};

