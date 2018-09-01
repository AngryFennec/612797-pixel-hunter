import {render, changeScreen} from './util.js';
import introElement from './intro.js';
import state from './game-data.js';
import tasks from './game-data.js';

const gameOneTemplate =  (state, task) => {
  const template = `<p class="game__task">${task.description}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${task.imgFirst}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${task.imgSecond}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>`;
    return template;
};
/*
const QUESTION_NUMBERS = 2;
const gameOptions = Array.prototype.slice.call(gameOneElement.querySelectorAll(`.game__answer input[type="radio"]`));
const gameForm = gameOneElement.querySelector(`.game__content`);
gameForm.addEventListener(`click`, () => {
  const checkedOptions = gameOptions.filter(function (it) {
    return it.checked;
  });
  if (checkedOptions.length >= QUESTION_NUMBERS) {
    changeScreen(gameTwoElement);
  }
});
const backBtn = gameOneElement.querySelector(`.back`);
backBtn.addEventListener(`click`, () => {
  changeScreen(introElement);
});
*/
const gameOneElement = (state, task) => { return gameOneTemplate(state, task)};
export default gameOneElement;
