const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const router = express.Router();

router.post('/countquestionsperkeyword', statisticsController.countQuestionsPerKeyword);
router.post('/countquestionsperperiod', statisticsController.countQuestionsPerPeriod);

router.post('/percentagequestionsperkeyword', statisticsController.percentageQuestionsPerKeyword);
router.post('/percentagequestionsperperiod', statisticsController.percentageQuestionsPerPeriod);

module.exports = router;