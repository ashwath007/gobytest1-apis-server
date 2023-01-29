const express = require('express');
const route = express.Router();

const { createBusiness, getBusinessByID, getBusinessUserProfileLink, deleteBusiness } = require('../controllers/business');

// ?? Post Business
route.post('/create/business', createBusiness);
route.delete('/delete/business', deleteBusiness);
// ** Post Get Business
route.get('/get/a/business/:bid', getBusinessByID);
route.get('/get/a/business/user/link/:linkId', getBusinessUserProfileLink);


module.exports = route;