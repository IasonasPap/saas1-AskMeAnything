const express = require('express');
const router = express.Router({mergeParams: true});
const datalayerQuestionController = require('../controllers/datalayer.question.controller');

//Question Data Interface

// Create Question
router.post("/createquestion", datalayerQuestionController.createquestion);

//Delete Question
router.post("/deletequestion", datalayerQuestionController.deletequestion);

//Update Question's Text
router.post("/updatequestiontext", datalayerQuestionController.updatequestiontext);

//Find Question By Id
router.post("/findquestionbyid", datalayerQuestionController.findById);

//Find Question By Date
router.post("/findquestionbydate", datalayerQuestionController.findOneByDate);

//Find Questions By Date
router.post("/findquestionsbydate", datalayerQuestionController.findAllByDate);

//Find Keywords By Question
router.post("/findkeywordsbyquestion", datalayerQuestionController.findKeywordByQuestionId);

//Find Questions by Keyword
router.post("/findquestionsbykeyword", datalayerQuestionController.findQuestionByKeyword);

router.get("/findquestions", datalayerQuestionController.findAll);

module.exports = router;