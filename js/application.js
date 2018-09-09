import {changeScreen} from './util.js';
import Intro from './intro.js';
import StatsScreen from './stats.js';

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
    const statistics = new StatsScreen(state);
    changeScreen(statistics.element);
  }

}
