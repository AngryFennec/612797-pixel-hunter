import GameObject from './game-object.js';
import GameHeader from './game-header.js';
import StatsList from './stats-list.js';
import StatsScreen from './stats.js';
import Intro from './intro.js';
import {changeScreen2, changeScreen, render} from './util.js';

export default class GameOne extends GameObject {
  constructor(state, task, number) {
    super();
    this.state = state;
    this.task = task;
    this.number = number;
  }

  get template() {
    let header = new GameHeader(this.state).template;
    const stats = new StatsList(this.state).template;
    return  header + `<p class="game__task">${this.task.description}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this.task.imgFirst}" alt="Option 1" width="468" height="458">
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
        <img src="${this.task.imgSecond}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>` + stats;
  }

  checkAnswer(task, select) {
    return (task.rightAnswer[0] === select[0].value && task.rightAnswer[1] === select[1].value);
  }

  bind() {
    const gameOptions = Array.prototype.slice.call(this.element.querySelectorAll(`.game__answer input[type="radio"]`));
    const gameForm = this.element.querySelector(`.game__content`);
    gameForm.addEventListener(`click`, () => {
      const checkedOptions = gameOptions.filter(function (it) {
        return it.checked;
      });
      if (checkedOptions.length >= 2) {
        if (!this.checkAnswer(this.task, checkedOptions) && this.state.lives === 0) {
          this.state.answers[this.number] = false;
            changeScreen(new StatsScreen().element);
        } else if (!this.checkAnswer(this.task, checkedOptions)) {
          this.state.lives--;
          this.state.answers[this.number] = false;
          if (this.number === 9) {
            changeScreen(new StatsScreen().element);
          }
          changeScreen2(this.state.levels[this.number+1]);
        } else {
          this.state.answers[this.number] = true;
          if (this.number === 9) {
            changeScreen(new StatsScreen().element);
          }
          changeScreen2(this.state.levels[this.number+1]);
        }
      }
    });
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      changeScreen(new Intro().element);
    });
  }



}
