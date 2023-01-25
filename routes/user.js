const express = require('express');
const route = express.Router();

const { createUser } = require('../controllers/users');



route.post("create/user", createUser);


module.exports = route;