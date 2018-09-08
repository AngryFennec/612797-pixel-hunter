import AbstractView from './abstract.js';
export default class GameObject extends AbstractView {
  constructor(){
    super();
  }

  setScreens(levels, number) {
    this.levels = levels;
    this.number = number;
  }

  checkAnswer(task, select) {
  }
}
