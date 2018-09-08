import GameObject from './game-object.js';
import GameHeader from './game-header.js';
import StatsList from './stats-list.js';

export default class GameOne extends GameObject {
  constructor(state, task) {
    super();
    this.state = state;
    this.task = task;
  }

  get template() {
    const header = new GameHeader(this.state).template;
    const stats = new StatsList(this.state).template;
    return  header + `<p class="game__task">${this.task.description}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this.task.imgFirst}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this.task.imgSecond}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>` + stats;
  }
  checkAnswer(task, select){
    return (task.rightAnswer === select);
  }


}
