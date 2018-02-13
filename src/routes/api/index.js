const apiRoutes = require('express').Router();

const users = require('./users');


// route to return all users
apiRoutes.get('/users', users);


module.exports = apiRoutes;