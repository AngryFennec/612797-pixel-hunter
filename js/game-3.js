import AbstractView from './abstract.js';
import GameHeader from './game-header.js';
import StatsList from './stats-list.js';

export default class GameThree extends AbstractView {
  constructor(state, task) {
    super();
    this.state = state;
    this.task = task;
  }

  get template() {
    const header = new GameHeader(this.state).template;
    const stats = new StatsList(this.state).template;
    return  header + `<p class="game__task">${this.task.description}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.task.imgFirst}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.task.imgSecond}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.task.imgThird}" alt="Option 3" width="304" height="455">
        </div>
      </form>` + stats;
    }

    checkAnswer(task, select) {
      return (task.rightAnswer === Number(select));
    }
}
