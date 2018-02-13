// get user mongoose model
const User = require('./../../models/user');

module.exports = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.send(err);

        res.json(users);
    });
};