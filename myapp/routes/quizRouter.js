const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quiz', quizController.getQuizPage);
router.get('/getData', quizController.getQuizData);
router.get('/restart', () => { process.exit() });

module.exports = router;
