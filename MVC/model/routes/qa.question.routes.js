const express = require('express');
const router = express.Router({mergeParams: true});
const qaQuestionOperations = require('../operations/qa.question.operations');
const auth = require('../middlewares/auth');

//Question Interface

router.post("/createquestion", auth, qaQuestionOperations.createquestion);

router.post("/deletequestion", auth, qaQuestionOperations.deletequestion);

router.post("/updatequestiontext", auth, qaQuestionOperations.updatequestiontext);

router.post("/findquestionbyid", qaQuestionOperations.findById);

router.post("/findquestionsbyuserid", auth, qaQuestionOperations.findQuestionsByUserId);

router.post("/findquestionbydate", auth, qaQuestionOperations.findOneByDate);

router.post("/findquestionsbydate", qaQuestionOperations.findAllByDate);

router.post("/findquestionsbydateandkeyword", qaQuestionOperations.findAllByDateAndKeyword);

router.post("/findkeywordsbyquestion", auth, qaQuestionOperations.findKeywordByQuestionId);

router.post("/findquestionsbykeyword", qaQuestionOperations.findQuestionsByKeyword);

router.get("/findquestions", qaQuestionOperations.findAll);

module.exports = router;