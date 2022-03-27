const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quiz', quizController.getQuizPage);
router.get('/setData', quizController.setQuiz);
router.get('/nextQuiz', quizController.nextQuiz);

module.exports = router;
