const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

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

const responseQuizData = async () => {
  const response = await fetch(API_URL);
  const quizData = await response.json();
  const quizInstance = new Quiz(quizData);
}

module.exports = {
  Quiz,
  responseQuizData
}