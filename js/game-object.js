import AbstractView from './abstract-view.js';
import Application from './application.js';
import GameModel from './game-model.js';
import {render, changeTaskScreen} from './util.js';

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
      newLi.classList.add(`stats__result`, `stats__result--unknown`);
      newLi.classList.remove(`stats__result--correct`, `stats__result--fast`, `stats__result--slow`, `stats__result--wrong`);
      if (!GameModel.state.answers[i] && i < this.number) {
        newLi.classList.add(`stats__result--wrong`);
      } else {
        newLi.classList.add(`stats__result--` + GameModel.state.answers[i]);
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
    changeTaskScreen(GameModel.state.levels[this.number + 1]);
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


  selectNextStep(gameOptions, gameForm) {
    if (!this.checkAnswer(this.task, gameOptions) && GameModel.state.lives === 1) {
      GameModel.state.answers.push(false);
      this.showStatsScreen(gameForm);
    } else if (!this.checkAnswer(this.task, gameOptions)) {
      GameModel.state.lives--;
      GameModel.state.answers.push(false);
      if (this.number === GameModel.state.count - 1) {
        this.showStatsScreen(gameForm);
      } else {
        gameForm.reset();
        changeTaskScreen(GameModel.state.levels[this.number + 1]);
      }
    } else {
      GameModel.state.answers.push(this.checkTime(GameModel.state.time));
      if (this.number === GameModel.state.count - 1) {
        this.showStatsScreen(gameForm);
      } else {
        gameForm.reset();
        changeTaskScreen(GameModel.state.levels[this.number + 1]);
      }
    }
  }

  showStatsScreen(gameForm) {
    gameForm.reset();
    Application.showStats(GameModel.state);
  }
}
