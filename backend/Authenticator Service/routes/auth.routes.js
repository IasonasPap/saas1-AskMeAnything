const express = require('express');
const router = express.Router({mergeParams: true});
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

router.post('/signin', authController.signin);
router.post('/logout', auth, authController.logout);
// router.post('/authorize', auth, authController.authorize);

module.exports = router;