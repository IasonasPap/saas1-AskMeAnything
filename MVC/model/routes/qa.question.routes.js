const express = require('express');
const router = express.Router({mergeParams: true});
const qaQuestionOperations = require('../operations/qa.question.operations');
const auth = require('../middlewares/auth');

//Question Data Interface

// Create Question
router.post("/createquestion", auth, qaQuestionOperations.createquestion);

//Delete Question
router.post("/deletequestion", auth, qaQuestionOperations.deletequestion);

//Update Question's Text
router.post("/updatequestiontext", auth, qaQuestionOperations.updatequestiontext);

//Find Question By Id
router.post("/findquestionbyid", auth, qaQuestionOperations.findById);

//Find Question By UserId
router.post("/findquestionsbyuserid", auth, qaQuestionOperations.findQuestionsByUserId);

//Find Question By Date
router.post("/findquestionbydate", auth, qaQuestionOperations.findOneByDate);

//Find Questions By Date
router.post("/findquestionsbydate", auth, qaQuestionOperations.findAllByDate);

//Find Questions By Date And Keyword
router.post("/findquestionsbydateandkeyword", auth, qaQuestionOperations.findAllByDateAndKeyword);

//Find Keywords By Question
router.post("/findkeywordsbyquestion", auth, qaQuestionOperations.findKeywordByQuestionId);

//Find Questions by Keyword
router.post("/findquestionsbykeyword", auth, qaQuestionOperations.findQuestionsByKeyword);

router.get("/findquestions", qaQuestionOperations.findAll);

router.get("/countquestions", qaQuestionOperations.findLength);

module.exports = router;