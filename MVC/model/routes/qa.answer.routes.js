const express = require('express');
const router = express.Router({mergeParams: true});
const qaAnswerOperations = require('../operations/qa.answer.operations');
const auth = require('../middlewares/auth');

// Answer Interface

router.post("/createanswer", auth, qaAnswerOperations.createanswer);

router.post("/deleteanswer", auth, qaAnswerOperations.deleteanswer);

router.post("/updateanswertext", auth, qaAnswerOperations.updateanswertext);

router.post("/findanswersbyquestion", auth, qaAnswerOperations.findAnswersByQuestionId);

router.get("/findanswers", auth, qaAnswerOperations.findAll);

router.post("/findanswersbyuserid", auth, qaAnswerOperations.findAnswersByUserId);

module.exports = router;