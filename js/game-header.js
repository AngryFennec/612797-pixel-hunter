import AbstractView from './abstract-view.js';
import GameModel from './game-model.js';

const LIVES = 3;

export default class GameHeader extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    <div class="game__timer">${GameModel.state.time}</div>
    <div class="game__lives">
      ${new Array(LIVES - GameModel.state.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``)}
      ${new Array(GameModel.state.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
      </div>
    </header>`;
  }
}
