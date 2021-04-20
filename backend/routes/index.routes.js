const express = require('express');
const userRoutes = require('./user.routes');
const userController = require('../controllers/user.controller');
const datalayerRoutes = require('./datalayer.routes');
const router = express.Router();

router.post('/signup', userController.signup);
router.use('/users', userRoutes);
router.use('/datalayer', datalayerRoutes);

module.exports = router;