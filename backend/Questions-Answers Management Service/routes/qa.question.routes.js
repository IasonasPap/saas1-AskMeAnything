const express = require('express');
const router = express.Router({mergeParams: true});
const qaQuestionController = require('../controllers/qa.question.controller');

//Question Data Interface

// Create Question
router.post("/createquestion", qaQuestionController.createquestion);

//Delete Question
router.post("/deletequestion", qaQuestionController.deletequestion);

//Update Question's Text
router.post("/updatequestiontext", qaQuestionController.updatequestiontext);

//Find Question By Id
router.post("/findquestionbyid", qaQuestionController.findById);

//Find Question By Date
router.post("/findquestionbydate", qaQuestionController.findOneByDate);

//Find Questions By Date
router.post("/findquestionsbydate", qaQuestionController.findAllByDate);

//Find Keywords By Question
router.post("/findkeywordsbyquestion", qaQuestionController.findKeywordByQuestionId);

//Find Questions by Keyword
router.post("/findquestionsbykeyword", qaQuestionController.findQuestionByKeyword);

router.get("/findquestions", qaQuestionController.findAll);

module.exports = router;