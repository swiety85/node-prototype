// get user mongoose model
const User = require('./../../models/user');

module.exports = async (req, res) => {
    try {
        const users = await User.find({}).exec();

        res.json(users);
    } catch(err) {
        res.send(err);
    }
};