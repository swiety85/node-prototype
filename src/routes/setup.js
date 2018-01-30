const User = require('./../models/user'); // get our mongoose model

module.exports = function (app) {

    app.get('/setup', (req, res) => {

        // create a sample user
        const nick = new User({
            name: 'Damian Wajdlich',
            password: 'password',
            isAdmin: true
        });

        // save the sample user
        nick.save((err) => {
            console.error(err);
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });
};

