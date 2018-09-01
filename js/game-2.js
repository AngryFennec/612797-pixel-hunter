import {render, changeScreen} from './util.js';
import introElement from './intro.js';
import state from './game-data.js';
import tasks from './game-data.js';

const gameTwoTemplate =  (state, task) => {
  const template = `<p class="game__task">${task.description}</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="${task.imgFirst}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form> //stats`;
      return template;
};
const gameTwoElement = (state, task) => { return gameTwoTemplate(state, task)};
export default gameTwoElement;


/*
const gameOptions = Array.prototype.slice.call(gameTwoElement.querySelectorAll(`.game__answer input[type="radio"]`));
const onRadioClick = () => {
  changeScreen(gameThreeElement);
};
gameOptions.forEach(function (it) {
  it.addEventListener(`click`, onRadioClick);
});
const backBtn = gameTwoElement.querySelector(`.back`);
backBtn.addEventListener(`click`, () => {
  changeScreen(introElement);
});

export default gameTwoElement;
*/
