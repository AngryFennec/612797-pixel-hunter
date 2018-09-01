const gameThreeTemplate = (state, task) => {
  const template = `<p class="game__task">${task.description}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${task.imgFirst}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${task.imgSecond}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${task.imgThird}" alt="Option 3" width="304" height="455">
        </div>
      </form> //stats`;
  return template;
};

const gameThreeElement = (state, task) => {
  return gameThreeTemplate(state, task);
};
export default gameThreeElement;
