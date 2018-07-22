const routes = require('express').Router();

// const apiRoutes = require('./api');
// const publicRoutes = require('./public');
const usersRoutes = require('./users');

const auth = require('./../authentication');

// routes.use('/public', publicRoutes);

routes.get('/', (req, res) => {

    res.json({
        test: 'OK 1'
    });
});

routes.get('/setup', (req, res) => {

    res.json({
        test: 'OK'
    });
});


routes.use('/users', auth.authenticate(), usersRoutes);


module.exports = routes;