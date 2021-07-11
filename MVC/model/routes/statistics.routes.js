const express = require('express');
const router = express.Router({mergeParams: true});
const statisticsOperations = require('../operations/statistics.operations');

// Statistics Interface

router.post('/countquestionsperkeyword', statisticsOperations.countQuestionsPerKeyword);
router.post('/countquestionsperperiod', statisticsOperations.countQuestionsPerPeriod);

router.get('/questionsperdate', statisticsOperations.questionsPerDay);
router.get('/questionsperkeyword', statisticsOperations.questionsPerKeyword);

router.get('/countusers', statisticsOperations.countUsers);
router.get('/countquestions', statisticsOperations.countQuestions);
router.get('/countanswers', statisticsOperations.countAnswers);

module.exports = router;