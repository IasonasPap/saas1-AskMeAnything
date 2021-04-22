const express = require('express');
const router = express.Router({mergeParams: true});
const datalayerAuthController = require('../controllers/datalayer.auth.controller');
const datalayerQuestionController = require('../controllers/datalayer.question.controller');

// Authenticator Data Interface

//Authorize User - Signin
router.post("/authorize", datalayerAuthController.authorize);

//Create User - Signup
router.post("/createuser", datalayerAuthController.createuser);

//Update User's Password
router.post("/updatepassword", datalayerAuthController.updatepassword);

//Delete User
router.post("/deleteuser", datalayerAuthController.deleteuser);

router.get("/users", datalayerAuthController.findAll);

//Create-Question Data Interface
router.post("/createquestion", datalayerQuestionController.createquestion);

//Delete Question
//router.post("/deletequestion", datalayerQuestionController.deletequestion);

//Update Question's Text
router.post("/updatequestiontext", datalayerQuestionController.updatequestiontext);

router.get("/questions", datalayerQuestionController.findAll);

module.exports = router;