const express = require('express');
const router = express.Router({mergeParams: true});
const authOperations = require('../operations/auth.operations');
const auth = require('../middlewares/auth');

// Auth Interface

router.post('/signin', authOperations.signin);
router.post('/logout', auth, authOperations.logout);
router.post('/authorize', auth, authOperations.authorize);

module.exports = router;