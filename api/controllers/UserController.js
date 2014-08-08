/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  home: function (req, res) {
    console.log(req.user);
    res.view('user/home', {
      title: 'User - Home',
      user: req.user
    });
  },

  _config: {
    rest: true
  }

};

