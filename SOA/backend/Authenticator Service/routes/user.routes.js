const express = require('express');
const router = express.Router({mergeParams: true});
const usersController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

// User Interface
router.post("/signup", usersController.signup);

router.post("/updatepassword", auth, usersController.updatepassword);

router.post("/deleteuser", auth, usersController.deleteuser);

router.get("/findusers", usersController.findAll);

module.exports = router;