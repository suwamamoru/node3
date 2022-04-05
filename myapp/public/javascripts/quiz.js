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

// 「document is not defind」エラーが発生する。
// document はブラウザで JavaScript を実行する際に使用可能なインターフェイスで、
// Node.js で実行する際には提供されないので未定義の変数になる。
const titleElement = document.getElementById('title');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const startButton = document.getElementById('start-button');
const genreElement = document.getElementById('genre');
const difficultyElement = document.getElementById('difficulty');

startButton.addEventListener('click', () => {
  startButton.hidden = true;
  fetchQuizData(1);
});

const fetch = require('node-fetch');

const fetchQuizData = async (index) => {
  titleElement.textContent = '取得中';
  questionElement.textContent = '少々お待ち下さい';

  try {
    const responseData = await fetch('/quiz/getData');
    const dataJSON = await responseData.json();
    const answers = dataJSON.answers;
    const quizData = dataJSON.quizData;
    const quizInstance = new Quiz(quizData);
    setNextQuiz(quizInstance, answers, index);

  } catch {
    titleElement.textContent = '取得失敗'
    questionElement.textContent = 'クイズデータの読み込みに失敗しました'
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
};

const setNextQuiz = (quizInstance, answers, index) => {
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }

  if (index <= quizInstance.getNumOfQuiz()) {
    makeQuiz(quizInstance, answers, index);
  } else {
    finishQuiz(quizInstance);
  }
};

const makeQuiz = (quizInstance, answers, index) => {
  titleElement.innerHTML = `問題 ${index}`;
  genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
  difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
  questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)}`;

  answers[index - 1].forEach((answer) => {
    const answerElement = document.createElement('div');
    answersContainer.appendChild(answerElement);
    
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = answer;
    answerElement.appendChild(buttonElement);
    
    buttonElement.addEventListener('click', () => {
      quizInstance.countCorrectAnswersNum(index, answer);
      index++;
      setNextQuiz(quizInstance, answers, index);
    });
  });
};

const finishQuiz = (quizInstance) => {
  titleElement.textContent = `あなたの正答数は${quizInstance.getCorrectAnswersNum()}です！！`
  genreElement.textContent = '';
  difficultyElement.textContent = '';
  questionElement.textContent = '再チャレンジしたい場合は下をクリック！！';
  
  const restartButton = document.createElement('button');
  restartButton.textContent = 'ホームに戻る';
  answersContainer.appendChild(restartButton);
  restartButton.addEventListener('click', () => {
    location.reload();
  });
};

module.exports.Quiz = Quiz;
module.exports.fetchQuizData = fetchQuizData();
module.exports.setNextQuiz = setNextQuiz();
module.exports.makeQuiz = makeQuiz();
module.exports.finishQuiz = finishQuiz();
