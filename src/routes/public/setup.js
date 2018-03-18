// get user mongoose model
const User = require('./../../models/user');

module.exports = (req, res) => {
    const userData = {
        username: 'Damian Wajdlich',
        password: 'password',
        email: 'swiety85@gmail.com',
        isAdmin: true
    };

    User.remove({}, function (err) {
        if (err) return res.json({ success: false });

        User.create(userData, function(err){
            if (err) res.json({ success: false });
            else res.json({ success: true });
        });
    });
};