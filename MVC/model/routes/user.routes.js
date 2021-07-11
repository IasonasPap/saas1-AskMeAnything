const express = require('express');
const router = express.Router({mergeParams: true});
const usersOperations = require('../operations/user.operations');
const auth = require('../middlewares/auth');

//Create User - Signup
router.post("/signup", usersOperations.signup);

//Update User's Password
router.post("/updatepassword", auth, usersOperations.updatepassword);

//Delete User
router.post("/deleteuser", auth, usersOperations.deleteuser);

router.get("/findusers", usersOperations.findAll);

router.get('/countusers', usersOperations.findLength);

module.exports = router;