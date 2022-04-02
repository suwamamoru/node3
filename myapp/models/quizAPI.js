const fetch = require('node-fetch');

const responseQuizData = async () => {
  const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';
  const response = await fetch(API_URL);
  const quizData = await response.json();
  buildAnswers(quizData);
  return quizData;
}

const buildAnswers = (quizData) => {
  const answers = [];
  quizData.results.forEach(value => {
    value.incorrect_answers.forEach(incorrect => {
      answers.push(incorrect);
    });
    answers.push(value.correct_answer);
  });

  const slicedAnswers = [];
  for (let i = 0; i < answers.length; i=i+4) {
    slicedAnswers.push(shuffleArray(answers.slice(i, i+4)));
  }
  module.exports.answers = slicedAnswers;
};

const shuffleArray = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

responseQuizData()
  .then(quizData => {
    module.exports.quizData = quizData;
  })
  .catch(error => console.log(error))
