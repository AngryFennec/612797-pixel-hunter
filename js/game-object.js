import AbstractView from './abstract.js';
import {render, changeScreen2} from './util.js';

export default class GameObject extends AbstractView {
  constructor(state, task, number) {
    super();
    this.state = state;
    this.task = task;
    this.number = number;
  }

  renewLives(state) {
    this.state = state;
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

  renewStats() {
    let statsRow = this.element.querySelector(`.stats`);
    statsRow.innerHTML = ``;
    for (let i = 0; i < 10; i++) {
      let newLi = document.createElement(`li`);
      newLi.classList.add(`stats__result`);
      newLi.classList.add(`stats__result--unknown`);
      if (!this.state.answers[i] && i < this.number) {
        newLi.classList.add(`stats__result--wrong`);
      } else if (this.state.answers[i] === `usual`) {
        newLi.classList.add(`stats__result--correct`);
      } else if (this.state.answers[i] === `slow`) {
        newLi.classList.add(`stats__result--slow`);
      } else if (this.state.answers[i] === `fast`) {
        newLi.classList.add(`stats__result--fast`);
      }
      statsRow.appendChild(newLi);
    }
  }

  renewTimer(state) {
    this.state = state;
    let timerDiv = this.element.querySelector(`.game__timer`);

    timerDiv.textContent = this.state.time;
  }

  changeToNextLevel() {
    this.state.answers[this.number] = false;
    changeScreen2(this.state.levels[this.number + 1]);
  }

  checkTime(time) {
    if (time < 10) {
      return `slow`;
    }
    if (time >= 20) {
      return `fast`;
    }
    return `usual`;
  }
}
