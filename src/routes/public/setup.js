// get user mongoose model
const User = require('./../../models/user');

module.exports = async (req, res) => {
    const userData = {
        username: 'Damian Wajdlich',
        password: 'password',
        email: 'swiety85@gmail.com',
        isAdmin: true
    };

    try {
        await User.remove({});
        await User.create(userData);

        res.json({ success: true });
    } catch(err) {
        res.send(err);
    }
};