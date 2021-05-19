const express = require('express');
const router = express.Router({mergeParams: true});
const usersController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

//Create User - Signup
router.post("/signup", usersController.signup);

//Update User's Password
router.post("/updatepassword", auth, usersController.updatepassword);

//Delete User
router.post("/deleteuser", auth, usersController.deleteuser);

router.get("/findusers", usersController.findAll);

module.exports = router;