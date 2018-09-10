import GameObject from './game-object.js';
import GameHeader from './game-header.js';
import StatsList from './stats-list.js';
import Application from './application.js';
import StatsScreen from './stats.js';
import Intro from './intro.js';
import {changeScreen, changeScreen2} from './util.js';

const TIME_LIMIT = 30;

export default class GameTwo extends GameObject {
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
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.task.imgFirst}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>` + stats;
  }

  checkAnswer(task, select) {
    return (task.rightAnswer === select);
  }


  bind() {
    const gameOptions = Array.prototype.slice.call(this.element.querySelectorAll(`.game__answer input[type="radio"]`));

    const onRadioClick = (evt) => {
      console.log(this.state.time);
      const chosen = evt.target.value;
      if (!this.checkAnswer(this.task, chosen) && this.state.lives === 1) {
        this.state.answers[this.number] = false;
        Application.showStats(this.state);
      } else if (!this.checkAnswer(this.task, chosen)) {
        this.state.lives--;
        this.state.answers[this.number] = false;
        if (this.number === 9) {
          Application.showStats(this.state);
        }
        changeScreen2(this.state.levels[this.number + 1]);
      } else {
        this.state.answers[this.number] = this.checkTime(this.state.time);
        if (this.number === 9) {
          Application.showStats(this.state);
        }
        changeScreen2(this.state.levels[this.number + 1]);
      }
    };
    gameOptions.forEach(function (it) {
      it.addEventListener(`click`, onRadioClick);
    });

    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      changeScreen(new Intro().element);
    });
  }
}
