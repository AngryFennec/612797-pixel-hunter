import {startTimer, stopTimer} from './timer.js';
import GameModel from './game-model.js';

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

export const changeTaskScreen = (object) => {
  stopTimer();
  mainElement.innerHTML = ``;
  object.renewLives(GameModel.state);
  object.renewStats(GameModel.state);
  mainElement.appendChild(object.element);
  startTimer(object);
};
