/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {

eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof global !== 'undefined') { return global; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar global = getGlobal();\n\nmodule.exports = exports = global.fetch;\n\n// Needed for TypeScript and Webpack.\nexports[\"default\"] = global.fetch.bind(global);\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack://myapp/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./public/javascripts/main.js":
/*!************************************!*\
  !*** ./public/javascripts/main.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/class */ \"./public/javascripts/modules/class.js\");\n\n\nconst titleElement = document.getElementById('title');\nconst questionElement = document.getElementById('question');\nconst answersContainer = document.getElementById('answers');\nconst startButton = document.getElementById('start-button');\nconst genreElement = document.getElementById('genre');\nconst difficultyElement = document.getElementById('difficulty');\n\nstartButton.addEventListener('click', () => {\n  startButton.hidden = true;\n  fetchQuizData(1);\n});\n\nconst fetch = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\n\nconst fetchQuizData = async (index) => {\n  titleElement.textContent = '取得中';\n  questionElement.textContent = '少々お待ち下さい';\n\n  try {\n    const responseData = await fetch('/quiz/getData');\n    const dataJSON = await responseData.json();\n    const answers = dataJSON.answers;\n    const quizData = dataJSON.quizData;\n    const quizInstance = new _modules_class__WEBPACK_IMPORTED_MODULE_0__.Quiz(quizData);\n    setNextQuiz(quizInstance, answers, index);\n\n  } catch {\n    titleElement.textContent = '取得失敗'\n    questionElement.textContent = 'クイズデータの読み込みに失敗しました'\n    setTimeout(() => {\n      location.reload();\n    }, 2000);\n  }\n};\n\nconst setNextQuiz = (quizInstance, answers, index) => {\n  while (answersContainer.firstChild) {\n    answersContainer.removeChild(answersContainer.firstChild);\n  }\n\n  if (index <= quizInstance.getNumOfQuiz()) {\n    makeQuiz(quizInstance, answers, index);\n  } else {\n    finishQuiz(quizInstance);\n  }\n};\n\nconst makeQuiz = (quizInstance, answers, index) => {\n  titleElement.innerHTML = `問題 ${index}`;\n  genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;\n  difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;\n  questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)}`;\n\n  answers[index - 1].forEach((answer) => {\n    const answerElement = document.createElement('div');\n    answersContainer.appendChild(answerElement);\n    \n    const buttonElement = document.createElement('button');\n    buttonElement.innerHTML = answer;\n    answerElement.appendChild(buttonElement);\n    \n    buttonElement.addEventListener('click', () => {\n      quizInstance.countCorrectAnswersNum(index, answer);\n      index++;\n      setNextQuiz(quizInstance, answers, index);\n    });\n  });\n};\n\nconst finishQuiz = (quizInstance) => {\n  titleElement.textContent = `あなたの正答数は${quizInstance.getCorrectAnswersNum()}です！！`\n  genreElement.textContent = '';\n  difficultyElement.textContent = '';\n  questionElement.textContent = '再チャレンジしたい場合は下をクリック！！';\n  \n  const restartButton = document.createElement('button');\n  restartButton.textContent = 'ホームに戻る';\n  answersContainer.appendChild(restartButton);\n  restartButton.addEventListener('click', () => {\n    location.reload();\n  });\n};\n\n\n//# sourceURL=webpack://myapp/./public/javascripts/main.js?");

/***/ }),

/***/ "./public/javascripts/modules/class.js":
/*!*********************************************!*\
  !*** ./public/javascripts/modules/class.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Quiz\": () => (/* binding */ Quiz)\n/* harmony export */ });\nclass Quiz {\n  constructor(quizData) {\n    this._quizzes = quizData.results;\n    this._correctAnswersNum = 0;\n  }\n  \n  getQuizCategory(index) {\n    return this._quizzes[index - 1].category;\n  }\n  \n  getQuizDifficulty(index) {\n    return this._quizzes[index - 1].difficulty;\n  }\n  \n  getNumOfQuiz() {\n    return this._quizzes.length;\n  }\n  \n  getQuizQuestion(index) {\n    return this._quizzes[index - 1].question;\n  }\n  \n  getCorrectAnswer(index) {\n    return this._quizzes[index - 1].correct_answer;\n  }\n  \n  getIncorrectAnswers(index) {\n    return this._quizzes[index - 1].incorrect_answers;\n  }\n  \n  countCorrectAnswersNum(index, answer) {\n    const correctAnswer = this._quizzes[index - 1].correct_answer;\n    if (answer === correctAnswer) {\n      return this._correctAnswersNum++;\n    }\n  }\n  \n  getCorrectAnswersNum() {\n    return this._correctAnswersNum;\n  }\n}\n\n\n\n//# sourceURL=webpack://myapp/./public/javascripts/modules/class.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/javascripts/main.js");
/******/ 	
/******/ })()
;