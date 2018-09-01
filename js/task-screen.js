import {render, changeScreen} from './util.js';
import introElement from './intro.js';
import state from './game-data.js';
import tasks from './game-data.js';
import container from './game-header.js';
import gameHeaderTemplate from './game-header.js';
import gameOneElement from './game-1.js';
import gameTwoElement from './game-2.js';
import gameThreeElement from './game-3.js';

const gameTask = (state, task) => {
  let template = ``;
  switch (task.number) {
    case 1: {
      template = gameTwoElement(state, task);
      break;
    }
    case 2: {
      template = gameOneElement(state, task);
      break;
    }
    case 3: {
      template = gameThreeElement(state, task);
      break;
    }
  }
  return template;
};
const levelScreen = render(gameHeaderTemplate(state) + gameTask(state, tasks[0]));
export default levelScreen;

//container.appendChild(render(gameTask(state, tasks[0])));
