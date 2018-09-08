import {render, changeScreen} from './util.js';
import Intro from './intro.js';
import statsElement from './stats.js';
import state from './game-data.js';
import tasks from './task-file.js';
import GameOne from './game-1.js';
import GameTwo from './game-2.js';
import GameThree from './game-3.js';

const gameTask = (currentState, task) => {
  let template = ``;
  switch (task.number) {
    case 1: {
      template = new GameTwo(currentState, task).template;
      break;
    }
    case 2: {
      template = new GameOne(currentState, task).template;
      break;
    }
    case 3: {
      template = new GameThree(currentState, task).template;
      break;
    }
  }
  return template;
};

const checkOneAnswer = (task, select) => {
  return (task.rightAnswer === select);
};

const checkTwoAnswer = (task, select) => {
  return (task.rightAnswer[0] === select[0].value && task.rightAnswer[1] === select[1].value);
};

const checkThreeAnswer = (task, select) => {
  return (task.rightAnswer === Number(select));
};

const getCurrentLevel = (currentState, task) => {
  return render(gameTask(currentState, task));
};

const levelHandler = (currentLevel, task, nextLevel) => {
  switch (task.number) {
    case 2: {
      const gameOptions = Array.prototype.slice.call(currentLevel.querySelectorAll(`.game__answer input[type="radio"]`));
      const gameForm = currentLevel.querySelector(`.game__content`);
      gameForm.addEventListener(`click`, () => {
        const checkedOptions = gameOptions.filter(function (it) {
          return it.checked;
        });
        if (checkedOptions.length >= 2) {
          if (!checkTwoAnswer(task, checkedOptions) && state.lives === 0) {
            answers.push(false);
            changeScreen(statsElement);
          } else if (!checkTwoAnswer(task, checkedOptions)) {
            state.lives--;
            answers.push(false);
            changeScreen(nextLevel);
          } else {
            answers.push(true);
            changeScreen(nextLevel);
          }
        }
      });
      break;
    }
    case 1: {
      const gameOptions = Array.prototype.slice.call(currentLevel.querySelectorAll(`.game__answer input[type="radio"]`));
      const onRadioClick = (evt) => {
        const chosen = evt.target.value;
        if (!checkOneAnswer(task, chosen) && state.lives === 0) {
          answers.push(false);
          changeScreen(statsElement);
        } else if (!checkOneAnswer(task, chosen)) {
          state.lives--;
          answers.push(false);
          changeScreen(nextLevel);
        } else {
          answers.push(true);
          changeScreen(nextLevel);
        }
      };
      gameOptions.forEach(function (it) {
        it.addEventListener(`click`, onRadioClick);
      });
      break;
    }
    case 3: {
      const gameOptions = Array.prototype.slice.call(currentLevel.querySelectorAll(`.game__option`));
      const onGameOptionClick = () => {
        const chosen = document.querySelector(`.game__option--selected`);
        if (!checkThreeAnswer(task, chosen.value) && state.lives === 0) {
          answers.push(false);
          changeScreen(statsElement);
        } else if (!checkThreeAnswer(task, chosen.value)) {
          state.lives--;
          answers.push(false);
          changeScreen(nextLevel);
        } else {
          answers.push(true);
          changeScreen(nextLevel);
        }
      };
      gameOptions.forEach(function (it) {
        it.addEventListener(`click`, onGameOptionClick);
      });
      break;
    }
  }
};

let answers = [];
let screens = [];
for (let i = 0; i < tasks.length; i++) {
  let levelScreen = getCurrentLevel(state, tasks[i]);
  const backBtn = levelScreen.querySelector(`.back`);
  backBtn.addEventListener(`click`, () => {
    changeScreen(new Intro().element);
  });
  screens.push(levelScreen);
}

for (let j = 0; j < screens.length - 1; j++) {
  levelHandler(screens[j], tasks[j], screens[j + 1]);
}
levelHandler(screens[screens.length - 1], tasks[tasks.length - 1], statsElement);

export default screens;
