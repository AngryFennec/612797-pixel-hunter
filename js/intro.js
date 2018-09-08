import {render, changeScreen} from './util.js';
import Greeting from './greeting.js';
import state from './game-data.js';
import AbstractView from './abstract.js';

export default class Intro extends AbstractView {
  constructor() {
    super();
    //this.state = state;
  }

  get template() {
    return `<section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
  }

  bind() {
    const toGreetingBtn = this.element.querySelector(`.intro__asterisk`);
    state.lives = 3;
    state.level = 0;
    toGreetingBtn.addEventListener(`click`, () => {
      changeScreen(new Greeting().element);
    });
  }
}
