const express = require('express');
const router = express.Router({mergeParams: true});
const datalayerAuthController = require('../controllers/datalayer.auth.controller');

// Authenticator Data Interface

//Authorize User - Signin
router.post("/authorize", datalayerAuthController.authorize);

//Create User - Signup
router.post("/createuser", datalayerAuthController.createuser);

//Update User's Password
router.post("/updatepassword", datalayerAuthController.updatepassword);

//Delete User
router.post("/deleteuser", datalayerAuthController.deleteuser);

router.get("/findusers", datalayerAuthController.findAll);

module.exports = router;