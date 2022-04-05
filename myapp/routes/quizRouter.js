const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quiz', quizController.getQuizPage);
router.get('/quizScript', quizController.getQuizScript);
router.get('/getData', quizController.getQuizData);

module.exports = router;
