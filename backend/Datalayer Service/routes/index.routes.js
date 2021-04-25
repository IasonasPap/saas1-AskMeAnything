const express = require('express');
const datalayerUserRoutes = require('./datalayer.user.routes');
const datalayerQuestionRoutes = require('./datalayer.question.routes');
const datalayerAnswerRoutes = require('./datalayer.answer.routes');
const router = express.Router();

router.use('/user', datalayerUserRoutes);
router.use('/question', datalayerQuestionRoutes);
router.use('/answer', datalayerAnswerRoutes);

module.exports = router;