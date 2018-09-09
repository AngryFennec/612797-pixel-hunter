export default class GameScreen {
  constructor() {
    if (new.target === GameScreen) {
      throw new Error(`already defined`);
    }
  }
