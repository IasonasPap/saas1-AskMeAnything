const express = require('express');
const router = express.Router({mergeParams: true});
const datalayerAnswerController = require('../controllers/datalayer.answer.controller');

//Answer Data Interface

//Create Answer
router.post("/createanswer", datalayerAnswerController.createanswer);

//Delete Answer
router.post("/deleteanswer", datalayerAnswerController.deleteanswer);

//Update Answer's Text
router.post("/updateanswertext", datalayerAnswerController.updateanswertext);

router.get("/findanswers", datalayerAnswerController.findAll);

module.exports = router;