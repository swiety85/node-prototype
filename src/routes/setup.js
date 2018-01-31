const User = require('./../models/user'); // get our mongoose model

module.exports = function (app) {
    const userData = {
        username: 'Damian Wajdlich',
        password: 'password',
        email: 'swiety85@gmail.com',
        isAdmin: true
    };

    app.get('/setup', (req, res) => {

        User.remove({}, function (err) {
            if (err) return res.json({ success: false });

            User.create(userData, function(err){
                if (err) res.json({ success: false });
                else res.json({ success: true });
            });
        });
    });
};

