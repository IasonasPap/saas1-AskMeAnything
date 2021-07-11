const express = require('express');
const router = express.Router({mergeParams: true});
const qaAnswerController = require('../controllers/qa.answer.controller');
const checkauth = require('../middlewares/checkauth');

//Answer Data Interface

//Create Answer
router.post("/createanswer", checkauth, qaAnswerController.createanswer);

//Delete Answer
router.post("/deleteanswer", checkauth, qaAnswerController.deleteanswer);

//Update Answer's Text
router.post("/updateanswertext", checkauth, qaAnswerController.updateanswertext);

//Find Answers by Question
router.post("/findanswersbyquestion", checkauth, qaAnswerController.findAnswersByQuestionId);

router.get("/findanswers", checkauth, qaAnswerController.findAll);

//Find Answers By UserId
router.post("/findanswersbyuserid", checkauth, qaAnswerController.findAnswersByUserId);

router.get('/countanswers', qaAnswerController.findLength);

module.exports = router;