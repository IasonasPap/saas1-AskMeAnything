const express = require('express');
const router = express.Router({mergeParams: true});
const qaAnswerOperations = require('../operations/qa.answer.operations');
const auth = require('../middlewares/auth');

//Answer Data Interface

//Create Answer
router.post("/createanswer", auth, qaAnswerOperations.createanswer);

//Delete Answer
router.post("/deleteanswer", auth, qaAnswerOperations.deleteanswer);

//Update Answer's Text
router.post("/updateanswertext", auth, qaAnswerOperations.updateanswertext);

//Find Answers by Question
router.post("/findanswersbyquestion", auth, qaAnswerOperations.findAnswersByQuestionId);

router.get("/findanswers", auth, qaAnswerOperations.findAll);

//Find Answers By UserId
router.post("/findanswersbyuserid", auth, qaAnswerOperations.findAnswersByUserId);

router.get('/countanswers', qaAnswerOperations.findLength);

module.exports = router;