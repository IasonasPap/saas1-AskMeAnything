const express = require('express');
const router = express.Router({mergeParams: true});
const qaQuestionController = require('../controllers/qa.question.controller');
const checkauth = require('../middlewares/checkauth');

//Question Data Interface

// Create Question
router.post("/createquestion", checkauth, qaQuestionController.createquestion);

//Delete Question
router.post("/deletequestion", checkauth, qaQuestionController.deletequestion);

//Update Question's Text
router.post("/updatequestiontext", checkauth, qaQuestionController.updatequestiontext);

//Find Question By Id
router.post("/findquestionbyid", checkauth, qaQuestionController.findById);

//Find Question By UserId
router.post("/findquestionsbyuserid", checkauth, qaQuestionController.findQuestionsByUserId);

//Find Question By Date
router.post("/findquestionbydate", checkauth, qaQuestionController.findOneByDate);

//Find Questions By Date
router.post("/findquestionsbydate", checkauth, qaQuestionController.findAllByDate);

//Find Questions By Date And Keyword
router.post("/findquestionsbydateandkeyword", checkauth, qaQuestionController.findAllByDateAndKeyword);

//Find Keywords By Question
router.post("/findkeywordsbyquestion", checkauth, qaQuestionController.findKeywordByQuestionId);

//Find Questions by Keyword
router.post("/findquestionsbykeyword", checkauth, qaQuestionController.findQuestionsByKeyword);

router.get("/findquestions", qaQuestionController.findAll);

module.exports = router;