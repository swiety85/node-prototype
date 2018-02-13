const routes = require('express').Router();

const apiRoutes = require('./api');
const publicRoutes = require('./public');

const auth = require('./../authentication');


routes.use('/public', publicRoutes);

routes.use('/api', auth.authenticate(), apiRoutes);


module.exports = routes;