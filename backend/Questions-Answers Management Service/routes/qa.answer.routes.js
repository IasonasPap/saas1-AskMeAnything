const express = require('express');
const router = express.Router({mergeParams: true});
const qaAnswerController = require('../controllers/qa.answer.controller');

//Answer Data Interface

//Create Answer
router.post("/createanswer", qaAnswerController.createanswer);

//Delete Answer
router.post("/deleteanswer", qaAnswerController.deleteanswer);

//Update Answer's Text
router.post("/updateanswertext", qaAnswerController.updateanswertext);

//Find Answers by Question
router.post("/findanswersbyquestion", qaAnswerController.findAnswersByQuestionId);

router.get("/findanswers", qaAnswerController.findAll);

module.exports = router;