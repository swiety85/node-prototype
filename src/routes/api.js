const express = require('express');
// get an instance of the router for api routes
const User = require('./../models/user'); // get our mongoose model
const auth = require('./../authentication');
const config = require('./../../config');

const apiRoutes = express.Router();

module.exports = function (app) {

    apiRoutes.post('/login', function(req, res) {
        if (req.body.name && req.body.password) {
            // find the user
            User.findOne({
                username: req.body.name
            }, (err, user) => {
                if (err) return res.send(err);
                if (!user) return res.sendStatus(401);

                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch) {
                        return res.json({
                            token: auth.createToken(user)
                        });
                    } else {
                        return res.sendStatus(401);
                    }
                });
            });
        } else {
            res.sendStatus(401);
        }
    });

    app.use(auth.initialize());

    // route to return all users (GET http://localhost:8080/api/users)
    apiRoutes.get('/users', auth.authenticate(), (req, res) => {
        User.find({}, (err, users) => {
            res.json(users);
        });
    });

    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);
};