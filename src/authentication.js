const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jwt-simple');

const User = require('./models/user');

const params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([(req) => {
        if (!req.headers['cookie']) {
            return null;
        }

        const jwt = req.headers['cookie'].split(';')
            .filter((cookieString) => {
                return cookieString.split('=')[0].trim() === 'jwt';
            })
            .map((cookieString) => {
                return cookieString.split('=')[1].trim();
            })[0];

        return jwt;
    }])
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
            return done(null, false);
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
        }, process.env.JWT_SECRET);
    }
};