import GameModel from './game-model.js';
import Application from './application.js';
const TIME_LIMIT = 30;
const ONE_SECOND = 1000;

export const tick = (obj) => {
  GameModel.state = Object.assign({}, GameModel.state, {
    time: GameModel.state.time - 1
  });
  if (GameModel.state.time === 0) {
    GameModel.state = Object.assign({}, GameModel.state, {
      lives: GameModel.state.lives - 1
    });
    if (GameModel.state.lives > 0) {
      obj.changeToNextLevel();
    } else {
      Application.showStats(GameModel.state);
    }
  } else {
    obj.renewTimer(GameModel.state);
  }
};

let _timer;

export const startTimer = (obj) => {
  obj.renewTimer(GameModel.state);
  _timer = setTimeout(() => {
    startTimer(obj);
    tick(obj);
  }, ONE_SECOND);
};

export const stopTimer = () => {
  GameModel.state = Object.assign({}, GameModel.state, {
    time: TIME_LIMIT
  });
  clearTimeout(_timer);
};

export default startTimer;
