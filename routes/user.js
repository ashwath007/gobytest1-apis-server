const express = require('express');
const route = express.Router();

const { createUser, getAUsers, getAllUsers, getAllUsername } = require('../controllers/users');



route.post("/create/user", createUser);


route.get("/get/a/user/:username", getAUsers);
route.get("/get/all/users", getAllUsers);
route.get("/get/all/usernames", getAllUsername);

module.exports = route;