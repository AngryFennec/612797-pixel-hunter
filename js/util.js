import {startTimer, stopTimer, state} from './game-data.js';

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
  object.renewLives(state);
  object.renewStats(state);
  mainElement.appendChild(object.element);
  startTimer(object);
};
