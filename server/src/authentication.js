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

        return getCookieValue(req, 'jwt');
    }])
};
const strategy = new passportJWT.Strategy(params, async function(payload, done) {

    try {
        const user = await User.findOne({ _id: payload.id }).exec();

        if (user) {
            done(null, { id: user.id });
        } else {
            done(null, false);
        }
    } catch(err) {
        done(err, null);
    }
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
        return jwt.encode({ id: user.id }, process.env.JWT_SECRET);
    }
};

function getCookieValue(req, key) {
    return req.headers['cookie'].split(';')
        .filter((cookieString) => {
            return cookieString.split('=')[0].trim() === key;
        })
        .map((cookieString) => {
            return cookieString.split('=')[1].trim();
        })[0];
}