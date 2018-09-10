import {changeScreen} from './util.js';
import Intro from './intro.js';
import StatsScreen from './stats.js';
import {startTimer, stopTimer} from './game-data.js';

export default class Application {

  static showWelcome() {
    const welcome = new Intro();
    changeScreen(welcome.element);
  }

  static showGame(userName) {
    const model = new QuestModel(userName);
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(state) {
    stopTimer();
    const stats = new StatsScreen(state);
    changeScreen(stats.element);
  }

}
