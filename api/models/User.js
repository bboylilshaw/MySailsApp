/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      maxLength: 50,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    firstName: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    lastName: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    email: {
      type: 'email',
      required: true,
      maxLength: 100
    },
    role: {
      required: true,
      type: 'string'
    },

    //Override toJSON method to remove password from API
    toJSON: function() {
      var obj = this.toObject();
      // Remove the password object value
      delete obj.password;
      // return the new object without password
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }

};

