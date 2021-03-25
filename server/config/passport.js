const passport = require('passport');
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User")
const keys = require("../config/keys");

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
}

module.exports = passport => {
  passport.use(
    new JwtStrategy({
      jwtFromRequest: cookieExtractor,
      secretOrKey: keys.secretOrKey
    }, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  )
};