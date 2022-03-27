const fetch = require('node-fetch');

class Quiz {
  constructor(quizData) {
    this._quizzes = quizData.results;
    this._correctAnswersNum = 0;
  }
  
  getQuizCategory(index) {
    return this._quizzes[index - 1].category;
  }
  
  getQuizDifficulty(index) {
    return this._quizzes[index - 1].difficulty;
  }
  
  getNumOfQuiz() {
    return this._quizzes.length;
  }
  
  getQuizQuestion(index) {
    return this._quizzes[index - 1].question;
  }
  
  getCorrectAnswer(index) {
    return this._quizzes[index - 1].correct_answer;
  }
  
  getIncorrectAnswers(index) {
    return this._quizzes[index - 1].incorrect_answers;
  }
  
  countCorrectAnswersNum(index, answer) {
    const correctAnswer = this._quizzes[index - 1].correct_answer;
    if (answer === correctAnswer) {
      return this._correctAnswersNum++;
    }
  }
  
  getCorrectAnswersNum() {
    return this._correctAnswersNum;
  }
}

const responseQuizData = async (index) => {
  const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';
  const response = await fetch(API_URL);
  const quizData = await response.json();
  const quizInstance = new Quiz(quizData);
  return quizInstance;

  //setNextQuiz(quizInstance, index);
}

/*
const setNextQuiz = (quizInstance, index) => {
  if (index <= quizInstance.getNumOfQuiz()) {
    makeQuiz(quizInstance, index);
  } else {
    finishQuiz(quizInstance);
  }
};

const buildAnswers = (quizInstance, index) => {
  const answers = [
    quizInstance.getCorrectAnswer(index),
    ...quizInstance.getIncorrectAnswers(index)
  ];
  return shuffleArray(answers);
};

const shuffleArray = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
*/
responseQuizData()
  .then(value => {
    //console.log(value);
    module.exports.value = value;
  })
  .catch(error => console.log(error))
