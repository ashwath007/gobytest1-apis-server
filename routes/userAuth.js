const express = require('express');
const { userLoginAuth } = require('../controllers/userAuth');
const route = express.Router();


route.post('/user/login/process', userLoginAuth);

module.exports = route;