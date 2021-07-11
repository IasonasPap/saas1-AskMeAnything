const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const router = express.Router();

router.post('/countquestionsperkeyword', statisticsController.countQuestionsPerKeyword);
router.post('/countquestionsperperiod', statisticsController.countQuestionsPerPeriod);

router.get('/questionsperdate', statisticsController.questionsPerDay);
router.get('/questionsperkeyword', statisticsController.questionsPerKeyword);

router.get('/countusers', statisticsController.countUsers);
router.get('/countquestions', statisticsController.countQuestions);
router.get('/countanswers', statisticsController.countAnswers);

module.exports = router;