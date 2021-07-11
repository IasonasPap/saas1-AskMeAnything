const express = require('express');
const router = express.Router({mergeParams: true});
const qaQuestionOperations = require('../operations/qa.question.operations');
const checkauth = require('../middlewares/checkauth');

//Question Interface

router.post("/createquestion", checkauth, qaQuestionOperations.createquestion);

router.post("/deletequestion", checkauth, qaQuestionOperations.deletequestion);

router.post("/updatequestiontext", checkauth, qaQuestionOperations.updatequestiontext);

router.post("/findquestionbyid", checkauth, qaQuestionOperations.findById);

router.post("/findquestionsbyuserid", checkauth, qaQuestionOperations.findQuestionsByUserId);

router.post("/findquestionbydate", checkauth, qaQuestionOperations.findOneByDate);

router.post("/findquestionsbydate", checkauth, qaQuestionOperations.findAllByDate);

router.post("/findquestionsbydateandkeyword", checkauth, qaQuestionOperations.findAllByDateAndKeyword);

router.post("/findkeywordsbyquestion", checkauth, qaQuestionOperations.findKeywordByQuestionId);

router.post("/findquestionsbykeyword", checkauth, qaQuestionOperations.findQuestionsByKeyword);

router.get("/findquestions", qaQuestionOperations.findAll);

module.exports = router;