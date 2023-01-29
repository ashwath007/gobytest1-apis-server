const express = require('express');
const route = express.Router();

const { createBusiness, getBusinessByID, getBusinessUserProfileLink, deleteBusiness, editBusiness, getAllBusiness } = require('../controllers/business');

// ?? Post Business
route.post('/create/business', createBusiness);
route.post('/edit/business/:bid', editBusiness);
route.delete('/delete/business/:bid', deleteBusiness);
// ** Post Get Business
route.get('/get/a/business/:bid', getBusinessByID);
route.get('/get/all/business', getAllBusiness);
route.get('/get/a/business/user/link/:linkId', getBusinessUserProfileLink);


module.exports = route;