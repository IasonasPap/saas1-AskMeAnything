const express = require('express');
const router = express.Router({mergeParams: true});
const usersOperations = require('../operations/user.operations');
const auth = require('../middlewares/auth');

// User Interface
router.post("/signup", usersOperations.signup);

router.post("/updatepassword", auth, usersOperations.updatepassword);

router.post("/deleteuser", auth, usersOperations.deleteuser);

router.get("/findusers", usersOperations.findAll);

module.exports = router;