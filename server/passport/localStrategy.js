<<<<<<< HEAD
const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;
=======
const User = require('../../models/user')
const LocalStrategy = require('passport-local').Strategy
>>>>>>> e14f187197f2d9829053d6196c5101683fd21dd7

const strategy = new LocalStrategy(
  {
    usernameField: 'username' // not necessary, DEFAULT
  },
  function(username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
