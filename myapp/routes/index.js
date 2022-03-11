const express = require('express');
const router = express.Router();
const quiz = require('./quizRouter');

router.use('/quiz', quiz);

module.exports = router;
