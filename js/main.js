'use strict';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const SCREENS = [
  `intro`,
  `greeting`,
  `rules`,
  `game-2`,
  `game-1`,
  `game-3`,
  `stats`
];

const mainElement = document.querySelector(`#main`);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

let sortedScreens = [];
const sortScreens = () => {
  SCREENS.forEach((el) => {
    sortedScreens.push(document.querySelector(`#` + el).content);
  });
};

const insertArrows = () => {
  let arrows = document.createElement(`div`);
  arrows.classList.add(`arrows__wrap`);
  arrows.innerHTML = `<style>\
    .arrows__wrap {\
      position: absolute;\
      top: 95px;\
      left: 50%;\
      margin-left: -56px;\
    }\
    .arrows__btn {\
      background: none;\
      border: 2px solid black;\
      padding: 5px 20px;\
    }\
  </style>`;
  let btnLeft = document.createElement(`button`);
  btnLeft.classList.add(`arrows__btn`);
  btnLeft.innerHTML = `<-`;
  let btnRight = document.createElement(`button`);
  btnRight.classList.add(`arrows__btn`);
  btnRight.innerHTML = `->`;
  arrows.appendChild(btnLeft);
  arrows.appendChild(btnRight);
  document.body.appendChild(arrows);
  btnLeft.addEventListener(`click`, () => {
    select(current - 1);
  });
  btnRight.addEventListener(`click`, () => {
    select(current + 1);
  });
};

sortScreens();
insertArrows();

let current = 0;
const select = (index) => {
  index = index < 0 ? sortedScreens.length - 1 : index;
  index = index >= sortedScreens.length ? 0 : index;
  current = index;
  selectSlide(sortedScreens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case LEFT_ARROW:
      select(current - 1);
      break;
    case RIGHT_ARROW:
      select(current + 1);
      break;
  }
});

select(0);
