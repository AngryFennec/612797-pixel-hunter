export default class GameModel {
  constructor() {
    if (new.target === GameModel) {
      throw new Error(`already defined`);
    }
  }
}
