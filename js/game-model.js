import {getState, resetInnerState} from './game-data.js';
import ScreensCreator from './screens.js';
import LIVES from './game-data.js';

export default class GameModel {
  static setData(data) {
    this.gameData = data;
  }

  static get data() {
    return this.gameData;
  }

  static assignState() {
    this.state = getState();
  }

  static init(data) {
    this.setData(data);
    this.assignState();
    this.state.levels = new ScreensCreator(data).createLevels();
  }


  static resetState() {
    GameModel.state = Object.assign({}, GameModel.state, {
      lives: LIVES,
      answers: {
        0: ``,
        1: ``,
        2: ``,
        3: ``,
        4: ``,
        5: ``,
        6: ``,
        7: ``,
        8: ``,
        9: ``
      }
    });
    resetInnerState();

  }


}
