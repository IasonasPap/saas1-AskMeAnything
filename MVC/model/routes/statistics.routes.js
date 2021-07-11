const express = require('express');
const router = express.Router({mergeParams: true});
const statisticsOperations = require('../operations/statistics.operations');

router.post('/countquestionsperkeyword', statisticsOperations.countQuestionsPerKeyword);
router.post('/countquestionsperperiod', statisticsOperations.countQuestionsPerPeriod);

router.get('/questionsperdate', statisticsOperations.questionsPerDay);
router.get('/questionsperkeyword', statisticsOperations.questionsPerKeyword);

module.exports = router;