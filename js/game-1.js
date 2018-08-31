import {render, changeScreen} from './util.js';
import gameTwoElement from './game-2.js';
import introElement from './intro.js';

const gameOneElement = render(`<section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
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
