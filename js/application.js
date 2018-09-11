import {changeScreen} from './util.js';
import Intro from './intro.js';
import StatsScreen from './stats.js';
import {stopTimer, clearState} from './game-data.js';

export default class Application {

  static showWelcome() {
    clearState();
    const welcome = new Intro();
    changeScreen(welcome.element);
  }

  static showStats(state) {
    stopTimer();
    const stats = new StatsScreen(state);
    changeScreen(stats.element);
  }

}
