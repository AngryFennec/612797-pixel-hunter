const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const screens = [
  `intro`,
  `greeting`,
  `rules`,
  `game-2`,
  `game-1`,
  `game-3`,
  `stats`
];

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

const sortScreens = function (array) {
  let newArray = [];
  array.map((el) => {
    newArray.push(document.querySelector(`#` + el).content);
  });
  return newArray;
};

const onLeftArrowClick = () => {
  select(current - 1, sortedScreens);
};

const onRightArrowClick = () => {
  select(current + 1, sortedScreens);
};

const insertArrows = () => {
  document.body.insertAdjacentHTML(`beforeEnd`, `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`);
};

const select = (index, array) => {
  current = index;
  if (index >= array.length) {
    current = array.length - 1;
  } else if (index < 0) {
    current = 0;
  }
  selectSlide(sortedScreens[current]);
};

const onKeyDown = (evt) => {
  switch (evt.keyCode) {
    case LEFT_ARROW:
      select(current - 1, sortedScreens);
      break;
    case RIGHT_ARROW:
      select(current + 1, sortedScreens);
      break;
  }
};
// точка входа
const mainElement = document.querySelector(`#main`);
const sortedScreens = sortScreens(screens);
insertArrows();
const arrows = document.querySelectorAll(`.arrows__btn`);
const leftArrow = arrows[0];
const rightArrow = arrows[arrows.length - 1];
leftArrow.addEventListener(`click`, onLeftArrowClick);
rightArrow.addEventListener(`click`, onRightArrowClick);
let current = 0;
document.addEventListener(`keydown`, onKeyDown);
select(0, sortedScreens);
