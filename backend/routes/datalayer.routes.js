const express = require('express');
const router = express.Router({mergeParams: true});
const datalayerAuthController = require('../controllers/datalayer.auth.controller');
const datalayerQuestionController = require('../controllers/datalayer.question.controller');
const datalayerAnswerController = require('../controllers/datalayer.answer.controller');

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

//Question Data Interface

// Create Question
router.post("/createquestion", datalayerQuestionController.createquestion);

//Delete Question
//router.post("/deletequestion", datalayerQuestionController.deletequestion);

//Update Question's Text
router.post("/updatequestiontext", datalayerQuestionController.updatequestiontext);

router.get("/questions", datalayerQuestionController.findAll);

//Answer Data Interface

//Create Answer
router.post("/createanswer", datalayerAnswerController.createanswer);

//Delete Answer
//router.post("/deleteanswer", datalayerAnswerController.deleteanswer);

//Update Answer's Text
router.post("/updateanswertext", datalayerAnswerController.updateanswertext);

router.get("/answers", datalayerAnswerController.findAll);


module.exports = router;