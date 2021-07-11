const express = require('express');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const qaQuestionRoutes = require('./qa.question.routes');
const qaAnswerRoutes = require('./qa.answer.routes');
const statRoutes = require('./statistics.routes');
const router = express.Router();

// baseline endpoint https://localhost:5005/saas1

router.use('/question', qaQuestionRoutes);
router.use('/answer', qaAnswerRoutes);

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

router.use('/stat', statRoutes);

module.exports = router;