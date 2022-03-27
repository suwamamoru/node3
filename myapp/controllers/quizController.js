const quizAPI = require('../models/quizAPI');

exports.getQuizPage = (req, res) => {
  res.render('quizView');
};

exports.setQuiz = (req, res) => {
  const quizInstance = quizAPI.value._quizzes;
  const correctAnswerNum = quizAPI.value._correctAnswersNum;

  res.render('setQuizView', {
    i: 0,
    quizInstance: quizInstance,
    correctAnswerNum: correctAnswerNum
  });
};

exports.nextQuiz = (req, res) => {
  const quizInstance = quizAPI.value._quizzes;
  const correctAnswerNum = quizAPI.value._correctAnswersNum;

  res.render('setQuizView', {
    i: req.body.i,
    quizInstance: quizInstance,
    correctAnswerNum: correctAnswerNum
  });
};