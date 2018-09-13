import state from './game-data.js';
import ScreensCreator from './screens.js';

export default class GameModel {
  static setData(data) {
    this.gameData = data;
  }

  static get data() {
    return this.gameData;
  }

  static assignState() {
    this.state = state;
  }

  static init(data) {
    this.setData(data);
    this.assignState();
    this.state.levels = new ScreensCreator(data).createLevels();
  }


  static resetState() {
    this.state = Object.assign({}, this.state, {
      lives: 3,
      answers: {
        1: ``,
        2: ``,
        3: ``,
        4: ``,
        5: ``,
        6: ``,
        7: ``,
        8: ``,
        9: ``,
        10: ``
      }
    });
  }


}
