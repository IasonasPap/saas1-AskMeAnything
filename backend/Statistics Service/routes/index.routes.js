const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const router = express.Router();

router.post('/countquestionsperkeyword', statisticsController.countQuestionsPerKeyword);
router.post('/countquestionsperperiod', statisticsController.countQuestionsPerPeriod);

router.get('/questionsperdate', statisticsController.questionsPerDay);
router.get('/questionsperkeyword', statisticsController.questionsPerKeyword);

module.exports = router;