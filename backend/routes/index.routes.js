const express = require('express');
const userRoutes = require('./user.routes');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
const datalayerRoutes = require('./datalayer.routes');
const router = express.Router();

router.post('/signup', userController.signup);
router.use('/users', userRoutes);
router.use('/datalayer', datalayerRoutes);

router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);

module.exports = router;