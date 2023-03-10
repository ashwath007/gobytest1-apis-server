const express = require('express');
const { sendEmailActivities } = require('../../controllers/email/email-helper');
const route = express.Router();

route.post('/send/email', sendEmailActivities);


module.exports = route;