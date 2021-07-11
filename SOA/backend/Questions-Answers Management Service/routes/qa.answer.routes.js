const express = require('express');
const router = express.Router({mergeParams: true});
const qaAnswerController = require('../controllers/qa.answer.controller');
const checkauth = require('../middlewares/checkauth');

// Answer Interface

router.post("/createanswer", checkauth, qaAnswerController.createanswer);

router.post("/deleteanswer", checkauth, qaAnswerController.deleteanswer);

router.post("/updateanswertext", checkauth, qaAnswerController.updateanswertext);

router.post("/findanswersbyquestion", checkauth, qaAnswerController.findAnswersByQuestionId);

router.get("/findanswers", checkauth, qaAnswerController.findAll);

router.post("/findanswersbyuserid", checkauth, qaAnswerController.findAnswersByUserId);

module.exports = router;