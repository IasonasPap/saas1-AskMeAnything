const express = require('express');
const router = express.Router({mergeParams: true});
const qaAnswerOperations = require('../operations/qa.answer.operations');
const checkauth = require('../middlewares/checkauth');

// Answer Interface

router.post("/createanswer", checkauth, qaAnswerOperations.createanswer);

router.post("/deleteanswer", checkauth, qaAnswerOperations.deleteanswer);

router.post("/updateanswertext", checkauth, qaAnswerOperations.updateanswertext);

router.post("/findanswersbyquestion", checkauth, qaAnswerOperations.findAnswersByQuestionId);

router.get("/findanswers", checkauth, qaAnswerOperations.findAll);

router.post("/findanswersbyuserid", checkauth, qaAnswerOperations.findAnswersByUserId);

module.exports = router;