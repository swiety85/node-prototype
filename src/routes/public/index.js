const publicRoutes = require('express').Router();

const login = require('./login');
const setup = require('./setup');
const test = require('./test');


publicRoutes.post('/login', login);

publicRoutes.get('/setup', setup);

publicRoutes.get('/test', test);


module.exports = publicRoutes;