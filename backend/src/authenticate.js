const passport = require('passport');
const User = require('../models/users');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


let auth = {}


auth.getToken = (user) => {
    return jwt.sign(user, process.env.SECRET, {expiresIn: 3600});
}

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

auth.jwtPassport = passport.use('user-rule', new JwtStrategy(opts, 
    (jwt_payload, done) => {
        User.getUserByUsername(jwt_payload.username, (err, result) => {
            if (err) {
                return done(err, false);
            }
            else if (result.rows.length > 0){
                let user = result.rows[0];
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    }));

auth.verifyUser = passport.authenticate('user-rule', {session: false});

auth.jwtPassportAdmin = passport.use('admin-rule', new JwtStrategy(opts, 
    (jwt_payload, done) => {
        User.getUserByUsername(jwt_payload.username, (err, result) => {
            if (err) {
                return done(err, false);
            }
            else if (result.rows.length > 0 && result.rows[0].administrator){
                let user = result.rows[0];
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    }))

auth.verifyAdmin = passport.authenticate('admin-rule', {session: false});

module.exports = auth;
