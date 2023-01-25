const express = require('express');
const route = express.Router();

const { createBusiness } = require('../controllers/business');


route.post('/create/business', createBusiness);


module.exports = route;