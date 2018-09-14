import AbstractView from './abstract.js';
import GameModel from './game-model.js';
import {render, changeScreen2} from './util.js';

const FAST_TIME = 20;
const SLOW_TIME = 10;
const LIVES = 3;

export default class GameObject extends AbstractView {
  constructor(task, number) {
    super();
    this.task = task;
    this.number = number;
  }

  renewLives(state) {
    GameModel.state = state;
    let headerLives = this.element.querySelector(`.game__lives`);
    headerLives.innerHTML = ``;
    const newHeaderString = `<div class="game__lives">
      ${new Array(LIVES - GameModel.state.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``)}
      ${new Array(GameModel.state.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
      </div>`;
    headerLives.appendChild(render(newHeaderString));
  }

  renewStats() {
    let statsRow = this.element.querySelector(`.stats`);
    statsRow.innerHTML = ``;
    for (let i = 0; i < GameModel.state.count; i++) {
      let newLi = document.createElement(`li`);
      newLi.classList.add(`stats__result`);
      newLi.classList.add(`stats__result--unknown`);
      newLi.classList.remove(`stats__result--correct`);
      newLi.classList.remove(`stats__result--fast`);
      newLi.classList.remove(`stats__result--slow`);
      newLi.classList.remove(`stats__result--wrong`);
      if (!GameModel.state.answers[i] && i < this.number) {
        newLi.classList.add(`stats__result--wrong`);
      } else if (GameModel.state.answers[i] === `correct`) {
        newLi.classList.add(`stats__result--correct`);
      } else if (GameModel.state.answers[i] === `slow`) {
        newLi.classList.add(`stats__result--slow`);
      } else if (GameModel.state.answers[i] === `fast`) {
        newLi.classList.add(`stats__result--fast`);
      }
      statsRow.appendChild(newLi);
    }
  }

  renewTimer(state) {
    GameModel.state = state;
    let timerDiv = this.element.querySelector(`.game__timer`);
    timerDiv.textContent = GameModel.state.time;
    if (GameModel.state.time <= 5) {
      if (GameModel.state.time % 2 === 0) {
        timerDiv.style.color = `black`;
      } else {
        timerDiv.style.color = `red`;
      }

    }
  }


  changeToNextLevel() {
    GameModel.state.answers[this.number] = false;
    changeScreen2(GameModel.state.levels[this.number + 1]);
  }

  checkTime(time) {
    if (time < SLOW_TIME) {
      return `slow`;
    }
    if (time >= FAST_TIME) {
      return `fast`;
    }
    return `correct`;
  }
}
