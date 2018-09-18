import GameObject from './game-object.js';
import GameOne from './game-one.js';
import GameTwo from './game-two.js';
import GameThree from './game-three.js';

export default class ScreensCreator {
  constructor(tasks) {
    this.tasks = tasks;
  }

  getCurrentLevel(task, number) {
    let gameObject = new GameObject(task, number);
    switch (task.type) {
      case `two-of-two`: {
        gameObject = new GameOne(task, number);
        break;
      }
      case `tinder-like`: {
        gameObject = new GameTwo(task, number);
        break;
      }
      case `one-of-three`: {
        gameObject = new GameThree(task, number);
        break;
      }
    }
    return gameObject;
  }

  createLevels() {
    let screens = [];
    for (let i = 0; i < this.tasks.length; i++) {
      let levelScreen = this.getCurrentLevel(this.tasks[i], i);
      screens.push(levelScreen);
    }
    return screens;
  }
}
