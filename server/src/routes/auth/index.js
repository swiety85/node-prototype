const authRoutes = require('express').Router();
const login = require('./login');

authRoutes.post('/login', login);

module.exports = authRoutes;