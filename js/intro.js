import {render, changeScreen} from './util.js';
import greetingElement from './greeting.js';

const introElement = render(`<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`);
  console.log(introElement);
const toGreetingBtn = introElement.querySelector(`.intro__asterisk`);
toGreetingBtn.addEventListener(`click`, () => changeScreen(greetingElement));
export default introElement;
