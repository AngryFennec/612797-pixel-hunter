import {changeScreen} from './util.js';
import Intro from './intro.js';
import StatsScreen from './stats.js';
import ErrorScreen from './error.js';
import GameModel from './game-model.js';
import {stopTimer} from './timer.js';

let gameData;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Application {

  static showWelcome() {
    GameModel.resetState();
    GameModel.init(gameData);
    const welcome = new Intro();
    changeScreen(welcome.element);
  }

  static showStats(state) {
    stopTimer();
    const stats = new StatsScreen(state);
    changeScreen(stats.element);
  }

  static start() {
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => {
        gameData = data;
      }).
      then(() => Application.showWelcome()).
      catch(Application.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeScreen(errorScreen.element);
  }

}
