const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/userSchema");
console.log("hello1");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Hello123456",
};

console.log("hello1");
passport.use(
  new JWTStrategy(opts, function(jwtPayLoad, done) {
    console.log("hello4", jwtPayLoad._id);
    User.findById(jwtPayLoad._id, function(err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        console.log("hello3", user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
    console.log("hello2", user);
  })
);

module.exports = passport;
