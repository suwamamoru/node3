const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quiz', quizController.getQuizPage);
router.post('/setData', quizController.setQuiz);

module.exports = router;
