import {changeScreen} from './util.js';
import StatsScreen from './stats.js';
import Intro from './intro.js';
import ErrorScreen from './error-screen.js';
import GameModel from './game-model.js';
import Loader from './loader.js';
import {stopTimer} from './timer.js';

let gameData;

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
    Loader.saveResults(GameModel.state).
    then(() => Loader.loadResults(GameModel.state.name)).
    then((data) => stats.addResults(data)).
    catch(Application.showError);
  }

  static start() {
    Loader.loadData().
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
