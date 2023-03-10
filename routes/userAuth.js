const express = require('express');
const { userLoginAuth } = require('../controllers/userAuth');
const { createTempUser, sendCode, userValidator } = require('../controllers/users');
const route = express.Router();


route.post('/user/login/process', userLoginAuth);
route.post('/create/user/temp', createTempUser);
route.post('/send/code', sendCode);
route.post('/verify/user/temp', userValidator);




module.exports = route;