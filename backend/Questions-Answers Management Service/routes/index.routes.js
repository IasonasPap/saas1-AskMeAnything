const express = require('express');
const qaQuestionRoutes = require('./qa.question.routes');
const qaAnswerRoutes = require('./qa.answer.routes');
const router = express.Router();

router.use('/question', qaQuestionRoutes);
router.use('/answer', qaAnswerRoutes);

module.exports = router;