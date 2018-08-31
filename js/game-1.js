import {render, changeScreen} from './util.js';
import gameTwoElement from './game-2.js';
import introElement from './intro.js';
import state from './game-data.js';
import tasks from './game-data.js';

const gameOneElement = render(`<section class="game">
<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    <div class="game__timer">${state.time}</div>
    <div class="game__lives">
      ${new Array(3)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``)}
      ${new Array(state.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
    </div>
  </header>
    <p class="game__task">${tasks[0].description}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
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
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>

  </section>`);

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

export default gameOneElement;
