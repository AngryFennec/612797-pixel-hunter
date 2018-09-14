import GameObject from './game-object.js';
import GameModel from './game-model.js';
import GameHeader from './game-header.js';
import StatsList from './stats-list.js';
import Application from './application.js';
import {changeScreen2} from './util.js';

export default class GameOne extends GameObject {
  constructor(task, number) {
    super();
    this.task = task;
    this.number = number;
  }

  get template() {
    let header = new GameHeader().template;
    const stats = new StatsList(GameModel.state).template;
    return header + `<p class="game__task">${this.task.question}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this.task.answers[0].image.url}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this.task.answers[1].image.url}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
    </form>` + stats;
  }

  checkAnswer(task, select) {
    return (task.answers[0].type === select[0].value && task.answers[1].type === select[1].value);
  }

  bind() {
    const gameOptions = Array.prototype.slice.call(this.element.querySelectorAll(`.game__answer input[type="radio"]`));
    const gameForm = this.element.querySelector(`.game__content`);
    gameForm.addEventListener(`click`, () => {
      const checkedOptions = gameOptions.filter(function (it) {
        return it.checked;
      });
      if (checkedOptions.length >= 2) {
        if (!this.checkAnswer(this.task, checkedOptions) && GameModel.state.lives === 1) {
          GameModel.state.answers[this.number] = false;
          gameForm.reset();
          Application.showStats(GameModel.state);
        } else if (!this.checkAnswer(this.task, checkedOptions)) {
          GameModel.state.lives--;
          GameModel.state.answers[this.number] = false;
          if (this.number === GameModel.state.count - 1) {
            gameForm.reset();
            Application.showStats(GameModel.state);
          } else {
            gameForm.reset();
            changeScreen2(GameModel.state.levels[this.number + 1]);
          }
        } else {
          GameModel.state.answers[this.number] = this.checkTime(GameModel.state.time);
          if (this.number === GameModel.state.count - 1) {
            gameForm.reset();
            Application.showStats(GameModel.state);
          } else {
            gameForm.reset();
            changeScreen2(GameModel.state.levels[this.number + 1]);
          }
        }
      }
    });
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      Application.showWelcome();
    });
  }
}
