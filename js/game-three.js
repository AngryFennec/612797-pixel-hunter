import GameObject from './game-object.js';
import GameModel from './game-model.js';
import GameHeader from './game-header.js';
import StatsList from './stats-list.js';
import Application from './application.js';

export default class GameThree extends GameObject {
  constructor(task, number) {
    super();
    this.task = task;
    this.number = number;
  }

  get template() {
    let header = new GameHeader().template;
    const stats = new StatsList(GameModel.state).template;
    return header + `<p class="game__task">${this.task.question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.task.answers[0].image.url}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.task.answers[1].image.url}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.task.answers[2].image.url}" alt="Option 3" width="304" height="455">
        </div>
      </form>` + stats;
  }

  checkAnswer(task, options) {
    let j = 10;
    let k = 20;
    let rightAnswers = task.answers;
    let photos = 0;
    let paintings = 0;
    rightAnswers.forEach(function (item) {
      if (item.type === `photo`) {
        photos++;
      } else {
        paintings++;
      }
    });
    options.forEach(function (item, i) {
      if (item.querySelector(`.game__option--selected-image`)) {
        j = i;
      }
      if ((paintings > photos && task.answers[i].type === `photo`) || (paintings < photos && task.answers[i].type === `painting`)) {
        k = i;
      }
    });
    return (k === j);
  }

  bind() {
    const gameOptions = Array.prototype.slice.call(this.element.querySelectorAll(`.game__option`));
    const gameForm = this.element.querySelector(`.game__content`);
    const onGameOptionClick = (evt) => {
      evt.target.classList.add(`game__option--selected-image`);
      this.selectNextStep(gameOptions, gameForm);
    };
    gameOptions.forEach(function (it) {
      it.addEventListener(`click`, onGameOptionClick);
    });
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      Application.showWelcome();
    });
  }
}
