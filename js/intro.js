import {render, changeScreen} from './util.js';
import greetingElement from './greeting.js';
import state from './game-data.js';

const introElement = render(`<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`);

const toGreetingBtn = introElement.querySelector(`.intro__asterisk`);
state.lives = 3;
state.level = 0;
toGreetingBtn.addEventListener(`click`, () => changeScreen(greetingElement));
export default introElement;
