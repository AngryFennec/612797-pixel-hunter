import Application from './application.js';
import AbstractView from './abstract.js';

export default class StatsScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    let title = `Поражение :(`;
    if (this.state.answers[10]) {
      title = `Победа!`;
    }
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
  <section class="result">
    <h2 class="result__title">${title}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </section>`;
  }

  bind() {
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      Application.showWelcome();
    });
    this.createNewStats();
  }

  createNewStats() {
    const tableElement = document.createElement(`table`);
    tableElement.classList.add(`result__table`);
    const rowElement = document.createElement(`tr`);
    let firstCell = document.createElement(`td`);
    firstCell.classList.add(`result__number`);
    firstCell.textContent = this.element.querySelectorAll(`.result__table`).length + 1 + `.`;
    let secondCell = document.createElement(`td`);
    let ulElement = document.createElement(`ul`);
    ulElement.classList.add(`stats`);
    for (let i = 0; i < 10; i++) {
      let newLi = document.createElement(`li`);
      newLi.classList.add(`stats__result`);
      newLi.classList.add(`stats__result--unknown`);
      if (!this.state.answers[i]) {
        newLi.classList.add(`stats__result--wrong`);
      } else if (this.state.answers[i] === `usual`) {
        newLi.classList.add(`stats__result--correct`);
      } else if (this.state.answers[i] === `slow`) {
        newLi.classList.add(`stats__result--slow`);
      } else if (this.state.answers[i] === `fast`) {
        newLi.classList.add(`stats__result--fast`);
      }
      if (this.state.answers[i] === ``) {
        newLi.classList.remove(`stats__result--wrong`);
      }
      ulElement.appendChild(newLi);
    }
    let thirdCell = document.createElement(`td`);
    let fourthCell = document.createElement(`td`);
    if (this.isFail(ulElement)) {
      thirdCell.classList.add(`result__total`);
      fourthCell.classList.add(`result__total`);
      fourthCell.classList.add(`result__total--final`);
      fourthCell.textContent = `fail`;
      secondCell.appendChild(ulElement);
      rowElement.appendChild(firstCell);
      rowElement.appendChild(secondCell);
      rowElement.appendChild(thirdCell);
      rowElement.appendChild(fourthCell);
      tableElement.appendChild(rowElement);
    } else {
      thirdCell.classList.add(`result__points`);
      thirdCell.textContent = `× 100`;
      fourthCell.classList.add(`result__total`);
      fourthCell.textContent = this.calculateAll(ulElement);
      secondCell.appendChild(ulElement);
      rowElement.appendChild(firstCell);
      rowElement.appendChild(secondCell);
      rowElement.appendChild(thirdCell);
      rowElement.appendChild(fourthCell);
      tableElement.appendChild(rowElement);
      if (this.calculateFast(ulElement) !== 0) {
        tableElement.appendChild(this.createFastRow(ulElement));
      }
      if (this.state.lives !== 0) {
        tableElement.appendChild(this.createLivesRow());
      }
      if (this.calculateSlow(ulElement) !== 0) {
        tableElement.appendChild(this.createSlowRow(ulElement));
      }
    }
    const resultTable = this.element.querySelector(`.result`);
    resultTable.appendChild(tableElement);
  }

  isFail(element) {
    let fails = Array.prototype.slice.call(element.querySelectorAll(`.stats__result--wrong`));
    return (fails.length >= 3);
  }

  calculateFast(element) {
    let fasts = Array.prototype.slice.call(element.querySelectorAll(`.stats__result--fast`));
    return fasts.length;
  }

  calculateSlow(element) {
    let slows = Array.prototype.slice.call(element.querySelectorAll(`.stats__result--slow`));
    return slows.length;
  }

  calculateUsual(element) {
    let usuals = Array.prototype.slice.call(element.querySelectorAll(`.stats__result--usual`));
    return usuals.length;
  }

  calculateAll(element) {
    let sum = 0;
    sum += this.calculateUsual(element) * 100;
    sum += this.calculateFast(element) * 50;
    sum -= this.calculateSlow(element) * 50;
    sum += this.state.lives * 50;
    return sum;
  }

  createFastRow(element) {
    let points = this.calculateFast(element);
    const rowElement = document.createElement(`tr`);
    let firstCell = document.createElement(`td`);
    let secondCell = document.createElement(`td`);
    secondCell.classList.add(`result__extra`);
    secondCell.textContent = `Бонус за скорость:`;
    let thirdCell = document.createElement(`td`);
    thirdCell.classList.add(`result__extra`);
    let thirdSpan = document.createElement(`span`);
    thirdSpan.classList.add(`stats__result`);
    thirdSpan.classList.add(`stats__result--fast`);
    thirdCell.textContent = points;
    thirdCell.appendChild(thirdSpan);
    let fourthCell = document.createElement(`td`);
    fourthCell.classList.add(`result__points`);
    fourthCell.textContent = `× 50`;
    let fifthCell = document.createElement(`td`);
    fifthCell.classList.add(`result__total`);
    fifthCell.textContent = points * 50;
    rowElement.appendChild(firstCell);
    rowElement.appendChild(secondCell);
    rowElement.appendChild(thirdCell);
    rowElement.appendChild(fourthCell);
    rowElement.appendChild(fifthCell);
    return rowElement;
  }

  createSlowRow(element) {
    let points = this.calculateSlow(element);
    const rowElement = document.createElement(`tr`);
    let firstCell = document.createElement(`td`);
    let secondCell = document.createElement(`td`);
    secondCell.classList.add(`result__extra`);
    secondCell.textContent = `Штраф за медлительность:`;
    let thirdCell = document.createElement(`td`);
    thirdCell.classList.add(`result__extra`);
    let thirdSpan = document.createElement(`span`);
    thirdSpan.classList.add(`stats__result`);
    thirdSpan.classList.add(`stats__result--slow`);
    thirdCell.textContent = points;
    thirdCell.appendChild(thirdSpan);
    let fourthCell = document.createElement(`td`);
    fourthCell.classList.add(`result__points`);
    fourthCell.textContent = `× 50`;
    let fifthCell = document.createElement(`td`);
    fifthCell.classList.add(`result__total`);
    fifthCell.textContent = points * 50 * (-1);
    rowElement.appendChild(firstCell);
    rowElement.appendChild(secondCell);
    rowElement.appendChild(thirdCell);
    rowElement.appendChild(fourthCell);
    rowElement.appendChild(fifthCell);
    return rowElement;
  }

  createLivesRow() {
    let points = this.state.lives;
    const rowElement = document.createElement(`tr`);
    let firstCell = document.createElement(`td`);
    let secondCell = document.createElement(`td`);
    secondCell.classList.add(`result__extra`);
    secondCell.textContent = `Бонус за жизни:`;
    let thirdCell = document.createElement(`td`);
    thirdCell.classList.add(`result__extra`);
    let thirdSpan = document.createElement(`span`);
    thirdSpan.classList.add(`stats__result`);
    thirdSpan.classList.add(`stats__result--alive`);
    thirdCell.textContent = points;
    thirdCell.appendChild(thirdSpan);
    let fourthCell = document.createElement(`td`);
    fourthCell.classList.add(`result__points`);
    fourthCell.textContent = `× 50`;
    let fifthCell = document.createElement(`td`);
    fifthCell.classList.add(`result__total`);
    fifthCell.textContent = points * 50;
    rowElement.appendChild(firstCell);
    rowElement.appendChild(secondCell);
    rowElement.appendChild(thirdCell);
    rowElement.appendChild(fourthCell);
    rowElement.appendChild(fifthCell);
    return rowElement;
  }
}
