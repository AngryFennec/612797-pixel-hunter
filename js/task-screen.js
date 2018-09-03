import {render, changeScreen} from './util.js';
import introElement from './intro.js';
// import statsElement from './stats.js';
import state from './game-data.js';
import tasks from './task-file.js';
import gameHeaderTemplate from './game-header.js';
import gameOneElement from './game-1.js';
import gameTwoElement from './game-2.js';
import gameThreeElement from './game-3.js';


const gameTask = (currentState, task) => {
  let template = ``;
  switch (task.number) {
    case 1: {
      template = gameTwoElement(currentState, task);
      break;
    }
    case 2: {
      template = gameOneElement(currentState, task);
      break;
    }
    case 3: {
      template = gameThreeElement(currentState, task);
      break;
    }
  }
  return template;
};


const getCurrentLevel = (currentState, task) => {
  return render(gameHeaderTemplate(currentState) + gameTask(currentState, task));
};

let levelScreen = getCurrentLevel(state, tasks[0]);

const levelHandler = (currentLevel, task, nextLevel) => {
  if (state.level < 9) {
    state.level++;
  }
  switch (task.number) {
    case 2: {
      const gameOptions = Array.prototype.slice.call(currentLevel.querySelectorAll(`.game__answer input[type="radio"]`));
      const gameForm = currentLevel.querySelector(`.game__content`);
      gameForm.addEventListener(`click`, () => {
        const checkedOptions = gameOptions.filter(function (it) {
          return it.checked;
        });
        if (checkedOptions.length >= 2) {
          changeScreen(nextLevel);
        }
      });
      break;
    }
    case 1: {
      const gameOptions = Array.prototype.slice.call(currentLevel.querySelectorAll(`.game__answer input[type="radio"]`));
      const onRadioClick = () => {
        changeScreen(nextLevel);
      };
      gameOptions.forEach(function (it) {
        it.addEventListener(`click`, onRadioClick);
      });
      break;
    }
    case 3: {
      const gameOptions = Array.prototype.slice.call(currentLevel.querySelectorAll(`.game__option`));
      const onGameOptionClick = () => {
        changeScreen(nextLevel);
      };
      gameOptions.forEach(function (it) {
        it.addEventListener(`click`, onGameOptionClick);
      });
      break;
    }
  }
};
const backBtn = levelScreen.querySelector(`.back`);
backBtn.addEventListener(`click`, () => {
  changeScreen(introElement);
});

levelHandler(levelScreen, tasks[state.level], getCurrentLevel(state, tasks[state.level + 1]));
export default levelScreen;

// container.appendChild(render(gameTask(state, tasks[0])));
