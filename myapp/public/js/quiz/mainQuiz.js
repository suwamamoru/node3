import { Quiz } from './quizClass.js';

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
