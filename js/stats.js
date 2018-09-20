import Application from './application.js';
import AbstractView from './abstract-view.js';
import StatsList from './stats-list.js';
import {render} from './util.js';

const BONUS = 50;
const USUAL = 100;

export default class StatsScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  getScoreTemplate(data, number) {
    let resultTemplate = ``;
    const statsTemplate = new StatsList(this.state).template;
    if (data.answers[this.state.count - 1]) {
      resultTemplate = `<table class="result__table">
        <tr>
          <td class="result__number">${number}.</td>
          <td colspan="2">` + statsTemplate +
          `</td>
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
      </table>`;
    } else {
      resultTemplate = `<table class="result__table">
        <tr>
          <td class="result__number">${number}.</td>
          <td>` + statsTemplate + `</td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
    }
    return resultTemplate;
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
    let scoreTemplate = this.getScoreTemplate(this.state, 1);
    if (this.state.answers.length === this.state.count) {
      title = `Победа!`;
    }
    resultTemplate = `<section class="result"><h2 class="result__title">${title}</h2>` + scoreTemplate + `</section>`;
    return headerTemplate + resultTemplate;
  }

  bind() {
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      Application.showWelcome();
    });
    this.createNewStats(this.element, this.state);
    const ulElement = this.element.querySelector(`.stats`);
    if (!this.isFail(ulElement)) {
      this.fillData(this.element);
    }
  }

  fillData(element) {
    this.fillTotal(element);
    this.fillTotalFinal(element);
    this.fillFast(element.querySelector(`.result__fast`));
    this.fillSlow(element.querySelector(`.result__slow`));
    this.fillLives(element.querySelector(`.result__lives`));
  }

  addResults(data) {
    let resultSection = this.element.querySelector(`.result`);
    if (data && data.length > 1) {
      let dataSlice = data.slice(0, length - 1);
      dataSlice.forEach((item, i) => resultSection.appendChild(this.createTableFromData(data[i], (i + 2))));
    }
  }

  createTableFromData(data, number) {
    let dataElement = render(this.getScoreTemplate(data, number));
    this.createNewStats(dataElement, data);
    const ulElement = dataElement.querySelector(`.stats`);
    if (!this.isFail(ulElement)) {
      this.fillData(dataElement);
    }
    return dataElement;
  }

  changeStatsClassList(statsElement, newClass) {
    statsElement.classList.remove(`stats__result--unknown`, `stats__result--wrong`);
    statsElement.classList.add(`stats__result--` + newClass);
  }

  createNewStats(element, data) {
    const liElements = Array.prototype.slice.call(element.querySelectorAll(`li.stats__result`));
    if (data.answers) {
      liElements.forEach((item, i) => {
        switch (data.answers[i]) {
          case `correct`: {
            this.changeStatsClassList(item, `correct`);
            break;
          }
          case `slow`: {
            this.changeStatsClassList(item, `slow`);
            break;
          }
          case `fast`: {
            this.changeStatsClassList(item, `fast`);
            break;
          }
          case false: {
            this.changeStatsClassList(item, `wrong`);
            break;
          }

        }
      });
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
    totalElement.textContent = this.calculateAll(element) - this.state.lives * BONUS;
  }

  fillTotalFinal(element) {
    let finalElement = element.querySelector(`.result__total--final`);
    finalElement.innerHTML = ``;
    finalElement.textContent = this.calculateAll(element);
  }

  isFail(element) {
    let fails = Array.prototype.slice.call(element.querySelectorAll(`.stats__result--wrong`));
    return (fails.length >= 3 || this.state.answers.length < this.state.count - 1);
  }

  fillFast(element) {
    const fasts = this.calculateFast(element);
    if (fasts !== 0) {
      let numberElement = element.querySelector(`.result__extra--col`);
      numberElement.textContent = fasts;
      let totalElement = element.querySelector(`.result__total`);
      totalElement.textContent = fasts * BONUS;
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
      totalElement.textContent = slows * (-BONUS);
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
      totalElement.textContent = lives * BONUS;
    } else {
      element.innerHTML = ``;
    }
  }

  calculateFast(element) {
    let fasts = Array.prototype.slice.call(element.querySelectorAll(`li.stats__result--fast`));
    return fasts.length;
  }

  calculateSlow(element) {
    let slows = Array.prototype.slice.call(element.querySelectorAll(`li.stats__result--slow`));
    return slows.length;
  }

  calculateUsual(element) {
    let usuals = Array.prototype.slice.call(element.querySelectorAll(`li.stats__result--correct`));
    return usuals.length;
  }

  calculateAll(element) {
    let sum = 0;
    sum += this.calculateUsual(element) * USUAL;
    sum += this.calculateFast(element) * (USUAL + BONUS);
    sum += this.calculateSlow(element) * BONUS;
    sum += this.state.lives * BONUS;
    return sum;
  }
}
