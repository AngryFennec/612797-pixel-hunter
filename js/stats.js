import Application from './application.js';
import AbstractView from './abstract.js';

export default class StatsScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const headerTemplate = `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>`;
    let resultTemplate = ``;
    let title = `Поражение :(`;
    if (this.state.answers[9]) {
      title = `Победа!`;
      resultTemplate = `<section class="result">
      <h2 class="result__title">${title}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
              <li class="stats__result"></li>
            </ul>
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total result__total--usual">900</td>
        </tr>
        <tr class="result__fast">
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra--col">1 <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">50</td>
        </tr>
        <tr class="result__lives">
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra--col">2 <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">100</td>
        </tr>
        <tr class="result__slow">
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra--col">2 <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-100</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">950</td>
        </tr>
      </table>
      </section>`;
    } else {
      resultTemplate = `<section class="result">
      <h2 class="result__title">${title}</h2><table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            <ul class="stats">
              <li class="stats__result stats__result--unknow"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
      </section>`;
    }
    return headerTemplate + resultTemplate;
  }

  bind() {
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      Application.showWelcome();
    });


    this.createNewStats(this.element);
    const ulElement = this.element.querySelector(`.stats`);
    this.fillNumber(this.element);
    if (!this.isFail(ulElement)) {
      this.fillTotal(this.element);
      this.fillTotalFinal(this.element);
      this.fillFast(this.element.querySelector(`.result__fast`));
      this.fillSlow(this.element.querySelector(`.result__slow`));
      this.fillLives(this.element.querySelector(`.result__lives`));
    }
  }

  createNewStats(element) {
    const liElements = Array.prototype.slice.call(element.querySelectorAll(`li.stats__result`));
    for (let i = 0; i < liElements.length; i++) {
      let newLi = liElements[i];
      newLi.classList.add(`stats__result--unknown`);
      if (this.state.answers[i] === `usual`) {
        newLi.classList.remove(`stats__result--unknown`);
        newLi.classList.remove(`stats__result--wrong`);
        newLi.classList.add(`stats__result--correct`);
      } else if (this.state.answers[i] === `slow`) {
        newLi.classList.remove(`stats__result--unknown`);
        newLi.classList.remove(`stats__result--wrong`);
        newLi.classList.add(`stats__result--slow`);
      } else if (this.state.answers[i] === `fast`) {
        newLi.classList.remove(`stats__result--unknown`);
        newLi.classList.remove(`stats__result--wrong`);
        newLi.classList.add(`stats__result--fast`);
      } else {
        if (!(this.state.answers[i] === ``)) {
          newLi.classList.remove(`stats__result--unknown`);
          newLi.classList.add(`stats__result--wrong`);
        }
      }
    }
  }

  fillNumber(element) {
    let numberElement = element.querySelector(`.result__number`);
    numberElement.innerHTML = ``;
    numberElement.textContent = this.element.querySelectorAll(`.result__table`).length + `.`;
  }

  fillTotal(element) {
    let totalElement = element.querySelector(`.result__total--usual`);
    totalElement.innerHTML = ``;
    totalElement.textContent = (this.calculateUsual(element) + this.calculateFast(element) + this.calculateSlow(element)) * 100;
  }

  fillTotalFinal(element) {
    let finalElement = element.querySelector(`.result__total--final`);
    finalElement.innerHTML = ``;
    finalElement.textContent = this.calculateAll(element);
  }

  isFail(element) {
    let fails = Array.prototype.slice.call(element.querySelectorAll(`.stats__result--wrong`));
    return (fails.length >= 3);
  }

  fillFast(element) {
    const fasts = this.calculateFast(element);
    if (fasts !== 0) {
      let numberElement = element.querySelector(`.result__extra--col`);
      numberElement.textContent = fasts;
      let totalElement = element.querySelector(`.result__total`);
      totalElement.textContent = fasts * 50;
    } else {
      element.innerHTML = ``;
    }
  }

  fillSlow(element) {
    const slows = this.calculateSlow(element);
    if (slows !== 0) {
      let numberElement = element.querySelector(`.result__extra--col`);
      numberElement.textContent = slows;
      let totalElement = element.querySelector(`.result__total`);
      totalElement.textContent = slows * (-50);
    } else {
      element.innerHTML = ``;
    }
  }

  fillLives(element) {
    const lives = this.state.lives;
    if (lives > 0) {
      let numberElement = element.querySelector(`.result__extra--col`);
      numberElement.textContent = lives;
      let totalElement = element.querySelector(`.result__total`);
      totalElement.textContent = lives * 50;
    } else {
      element.innerHTML = ``;
    }
  }

  calculateFast() {
    let fasts = Array.prototype.slice.call(this.element.querySelectorAll(`li.stats__result--fast`));
    return fasts.length;
  }

  calculateSlow() {
    let slows = Array.prototype.slice.call(this.element.querySelectorAll(`li.stats__result--slow`));
    return slows.length;
  }

  calculateUsual() {
    let usuals = Array.prototype.slice.call(this.element.querySelectorAll(`li.stats__result--usual`));
    return usuals.length;
  }

  calculateAll() {
    let sum = 0;
    sum += this.calculateUsual() * 100;
    sum += this.calculateFast() * 150;
    sum += this.calculateSlow() * 50;
    sum += this.state.lives * 50;
    return sum;
  }
}
