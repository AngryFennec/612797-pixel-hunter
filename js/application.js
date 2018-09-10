import {changeScreen} from './util.js';
import Intro from './intro.js';
import StatsScreen from './stats.js';
import {stopTimer} from './game-data.js';

export default class Application {

  static showWelcome() {
    const welcome = new Intro();
    changeScreen(welcome.element);
  }

  static showStats(state) {
    stopTimer();
    const stats = new StatsScreen(state);
    changeScreen(stats.element);
  }

}
