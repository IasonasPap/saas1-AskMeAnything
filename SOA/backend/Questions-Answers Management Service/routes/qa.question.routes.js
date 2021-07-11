const express = require('express');
const router = express.Router({mergeParams: true});
const qaQuestionController = require('../controllers/qa.question.controller');
const checkauth = require('../middlewares/checkauth');

//Question Interface

router.post("/createquestion", checkauth, qaQuestionController.createquestion);

router.post("/deletequestion", checkauth, qaQuestionController.deletequestion);

router.post("/updatequestiontext", checkauth, qaQuestionController.updatequestiontext);

router.post("/findquestionbyid", checkauth, qaQuestionController.findById);

router.post("/findquestionsbyuserid", checkauth, qaQuestionController.findQuestionsByUserId);

router.post("/findquestionbydate", checkauth, qaQuestionController.findOneByDate);

router.post("/findquestionsbydate", qaQuestionController.findAllByDate);

router.post("/findquestionsbydateandkeyword", qaQuestionController.findAllByDateAndKeyword);

router.post("/findkeywordsbyquestion", checkauth, qaQuestionController.findKeywordByQuestionId);

router.post("/findquestionsbykeyword", qaQuestionController.findQuestionsByKeyword);

router.get("/findquestions", qaQuestionController.findAll);

module.exports = router;