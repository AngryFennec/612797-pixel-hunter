import {render, changeScreen} from './util.js';
import statsElement from './stats.js';
import introElement from './intro.js';
import state from './game-data.js';
import tasks from './game-data.js';

const gameThreeTemplate =  (state, task) => {
  const template = `<p class="game__task">${task.description}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${task.imgFirst}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${task.imgSecond}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${task.imgThird}" alt="Option 3" width="304" height="455">
        </div>
      </form> //stats`;
      return template;
};
const gameThreeElement = (state, task) => { return gameThreeTemplate(state, task)};

export default gameThreeElement;



/*
const gameOptions = Array.prototype.slice.call(gameThreeElement.querySelectorAll(`.game__option`));
const onGameOptionClick = () => {
  changeScreen(statsElement);
};
gameOptions.forEach(function (it) {
  it.addEventListener(`click`, onGameOptionClick);
});
const backBtn = statsElement.querySelector(`.back`);
backBtn.addEventListener(`click`, () => {
  changeScreen(introElement);
});

export default gameThreeElement;
*/
