import {render, changeScreen, show} from './util.js';
import Intro from './intro.js';
import screens from './screens.js';
import AbstractView from './abstract.js';

export default class Rules extends AbstractView {
  constructor() {
    super();
    //this.state = state;
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
    </header>
    <section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>Ошибиться можно не более 3 раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
  }

  bind() {
    const rulesForm = this.element.querySelector(`.rules__form`);
    const rulesInput = this.element.querySelector(`.rules__input`);
    const rulesBtn = rulesForm.querySelector(`.rules__button`);
    rulesBtn.disabled = true;
    rulesInput.addEventListener(`input`, () => {
      if (rulesInput.value !== ``) {
        rulesBtn.disabled = false;
      }
    });
    rulesBtn.addEventListener(`click`, () => changeScreen(screens[0]));// changeScreen(gameOneElement));
    const backBtn = this.element.querySelector(`.back`);
    backBtn.onClick = () => changeScreen(new Intro().element);
  }

}
