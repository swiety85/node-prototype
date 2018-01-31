const passport = require('passport');
const passportJWT = require('passport-jwt');
const crypto = require('crypto');
const jwt = require('jwt-simple');

const config = require('./../config');
const User = require('./models/user');

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
};
const strategy = new passportJWT.Strategy(params, function(payload, done) {

    User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
            return done(err, null);
        } else if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
});

module.exports = {
    initialize: function() {
        passport.use(strategy);

        return passport.initialize();
    },
    authenticate: function() {
        return passport.authenticate('jwt', { session: false });
    },
    createToken: function (user) {
        return jwt.encode({
            id: user.id
        }, config.jwtSecret);
    }
};