import {render, changeScreen} from './util.js';
import statsElement from './stats.js';
import introElement from './intro.js';

const gameThreeElement = render(`<section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
    //stats
  </section>`);

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
