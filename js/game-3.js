import GameObject from './game-object.js';
import GameHeader from './game-header.js';
import StatsList from './stats-list.js';
import Application from './application.js';
import Intro from './intro.js';
import {changeScreen, changeScreen2} from './util.js';

export default class GameThree extends GameObject {
  constructor(state, task, number) {
    super();
    this.state = state;
    this.task = task;
    this.number = number;
  }

  get template() {
    let header = new GameHeader(this.state).template;
    const stats = new StatsList(this.state).template;
    return header + `<p class="game__task">${this.task.description}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.task.imgFirst}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.task.imgSecond}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.task.imgThird}" alt="Option 3" width="304" height="455">
        </div>
      </form>` + stats;
  }

  checkAnswer(task, options) {
    let j = 10;
    for (let i = 0; i < options.length; i++) {
      if (options[i].querySelector(`.game__option--selected-image`)) {
        j = i + 1;
      }
    }
    return (task.rightAnswer === j);
  }

  bind() {
    const gameOptions = Array.prototype.slice.call(this.element.querySelectorAll(`.game__option`));
    const gameForm = this.element.querySelector(`.game__content`);
    const onGameOptionClick = (evt) => {
      evt.target.classList.add(`game__option--selected-image`);
      if (!this.checkAnswer(this.task, gameOptions) && this.state.lives === 1) {
        this.state.answers[this.number] = false;
        gameForm.reset();
        Application.showStats(this.state);
      } else if (!this.checkAnswer(this.task, gameOptions)) {
        this.state.lives--;
        this.state.answers[this.number] = false;
        if (this.number === 9) {
          gameForm.reset();
          Application.showStats(this.state);
        } else {
          gameForm.reset();
          changeScreen2(this.state.levels[this.number + 1]);
        }
      } else {
        this.state.answers[this.number] = this.checkTime(this.state.time);
        if (this.number === 9) {
          gameForm.reset();
          Application.showStats(this.state);
        } else {
          gameForm.reset();
          changeScreen2(this.state.levels[this.number + 1]);
        }
      }
    };
    gameOptions.forEach(function (it) {
      it.addEventListener(`click`, onGameOptionClick);
    });
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      changeScreen(new Intro().element);
    });
  }
}
