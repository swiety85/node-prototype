const usersRoutes = require('express').Router();

const getUsers = require('./getUsers');


// route to return all users
usersRoutes.get('/', getUsers);


module.exports = usersRoutes;