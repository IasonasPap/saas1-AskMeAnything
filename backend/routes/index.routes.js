const express = require('express');
const userRoutes = require('./user.routes');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/signup', userController.signup);
router.use('/users', userRoutes)

module.exports = router;