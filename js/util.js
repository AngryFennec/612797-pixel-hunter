import {startTimer, stopTimer} from './game-data.js';

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const mainElement = document.querySelector(`#main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const changeScreen2 = (object) => {
  stopTimer();
  mainElement.innerHTML = ``;
  object.renewLives(object.state);
  mainElement.appendChild(object.element);
  startTimer(object);
};
