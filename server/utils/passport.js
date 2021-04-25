"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const { secret } = require("./config");
const pool = require("./mysqlConnection");

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const email = jwt_payload.email;
      const getUserQuery = "select fullname,email from User where email=?";

      pool.query(getUserQuery, [email], (err, sqlResult) => {
        if (err) {
          return callback(err, null);
        }
        if (sqlResult) {
          callback(null, sqlResult);
        } else {
          callback(null, false);
        }
      });
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
