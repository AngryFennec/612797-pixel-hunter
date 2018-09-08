import {render, changeScreen} from './util.js';
import state from './game-data.js';
import tasks from './task-file.js';
import GameObject from './game-object.js';
import GameOne from './game-1.js';
import GameTwo from './game-2.js';
import GameThree from './game-3.js';

const getCurrentLevel = (currentState, task, number) => {
  let gameObject = new GameObject(null, null, null);
  switch (task.number) {
    case 1: {
      gameObject = new GameTwo(currentState, task, number);
      break;
    }
    case 2: {
      gameObject = new GameOne(currentState, task, number);
      break;
    }
    case 3: {
      gameObject = new GameThree(currentState, task, number);
      break;
    }
  }
  return gameObject;
};

let answers = [];
let screens = [];
for (let i = 0; i < tasks.length; i++) {
  let levelScreen = getCurrentLevel(state, tasks[i], i);
  screens.push(levelScreen);
}
state.levels = screens;
export default screens;
