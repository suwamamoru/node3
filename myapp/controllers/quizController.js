const quizScript = require('../public/javascripts/quiz');
const quizAPI = require('../models/quizAPI');

exports.getQuizPage = (req, res) => {
  res.render('quizView');
};


exports.getQuizScript = (req, res) => {
  res.status(200).send(quizScript);
};

exports.getQuizData = (req, res) => {
  res.status(200).send(quizAPI);
};
