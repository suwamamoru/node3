const quizAPI = require('../models/quizAPI');

exports.getQuizPage = (req, res) => {
  res.render('quizView');
};

exports.getQuizData = (req, res) => {
  res.status(200).send(quizAPI);
};
