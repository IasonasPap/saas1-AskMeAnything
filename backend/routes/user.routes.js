const express = require('express');
const router = express.Router({mergeParams: true});
const users = require('../controllers/user.controller');

// Retrieve all Users
router.get("/", users.findAll);

module.exports = router;