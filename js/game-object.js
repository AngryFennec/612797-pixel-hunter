import AbstractView from './abstract.js';
import updateState from './game-data.js'
import {render} from './util.js';

export default class GameObject extends AbstractView {
  constructor(state, task, number) {
    super();
    this.state = state;
    this.task = task;
    this.number = number;
  }

  renewLives() {
    let headerLives = this.element.querySelector(`.game__lives`);
    headerLives.innerHTML = ``;
    const newHeaderString = `<div class="game__lives">
      ${new Array(3 - this.state.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``)}
      ${new Array(this.state.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
      </div>`;
    headerLives.appendChild(render(newHeaderString));
  }

  renewTimer(state) {
    this.state = state;
    let timerDiv = this.element.querySelector(`.game__timer`);

    timerDiv.textContent = this.state.time;
  }
}
