const quizAPI = require('../models/quizAPI');

exports.getQuizPage = (req, res) => {
  res.render('quizView');
};

exports.setQuiz = (req, res) => {
  const responseQuizData = quizAPI.responseQuizData()
  console.log(responseQuizData);
};