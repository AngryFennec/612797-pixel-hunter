const NUM = 10;
const TIME_LIMIT = 30;
const LEVEL_LIMIT = 10;
const LIVES = 3;
export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const addAnswer = (array, ans, sec) => {
  let newAnswer = {
    value: ans,
    time: sec
  };
  array.push(newAnswer);
  return array;
};

export const createAnswersArray = () => {
  let array = [];
  for (let i = 0; i < NUM; i++) {
    const ans = Math.random() >= 0.5;
    const sec = getRandomInt(0, TIME_LIMIT);
    addAnswer(array, ans, sec);
  }
  return array;
};


export const countScore = (answers, livesNumber) => {
  if (answers.length < 10) {
    return -1;
  }
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    const current = answers[i];
    if (current.value) {
      score += 100;
      if (current.time < 10) {
        score += 50;
      } else if (current.time > 20) {
        score -= 50;
      }
    }
  }
  score += livesNumber * 50;
  return score;
};

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  if (level > LEVEL_LIMIT) {
    throw new Error(`Level should not be greater than LEVEL_LIMIT`);
  }
  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

export const changeLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (lives < 0) {
    throw new Error(`Lives should not be negative value`);
  }
  if (lives > LIVES) {
    throw new Error(`Lives should not be greater than LIVES`);
  }
  if (lives > 0 && lives <= LIVES) {
    lives--;
  }
  const newGame = Object.assign({}, game, {
    lives
  });
  return newGame;
};

export const changeTime = (game, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number`);
  }
  if (time < 0) {
    throw new Error(`Time should not be negative value`);
  }
  if (time > TIME_LIMIT) {
    throw new Error(`Time should not be greater than TIME_LIMIT`);
  }
  if (time >= 0 && time < TIME_LIMIT) {
    time++;
  }
  const newGame = Object.assign({}, game, {
    time
  });
  return newGame;
};

  /* module4-task1 */

const imgs = {
  paintings: [
  // People
    `https://k42.kn3.net/CF42609C8.jpg`,
    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,
    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
  // People
    `http://i.imgur.com/1KegWPz.jpg`,
    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,
    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const state = {
  level: 0,
  lives: 3,
  livesLost: 3 - state.lives,
  time: 0
};

const taskTwoPictures = {
  description: `Угадайте для каждого изображения фото или рисунок?`,
  answers: new Set([`photo`, `paint`]),
  imgFirst: `www.ru`,
  imgSecond: `www.ru`,
  num: 2
};

const taskOnePicture = {
  description: `Угадай, фото или рисунок?`,
  answers: new Set([`photo`, `paint`]),
  imgFirst: `www.ru`,
  num: 1
};

const taskThreePictures = {
  description: `Найдите рисунок среди изображений`,
  answers: new Set([1, 2, 3]),
  imgFirst: `www.ru`,
  imgSecond: `www.ru`,
  imgThird: `www.ru`,
  num: 3
};

/*
const totalAnswer = {
  correct: true,
  imgLink: `link`
}*/

const createRandomTask = () => {
  const typeNum = getRandomInt(1, 3);
  let task = taskOnePicture;
  switch (typeNum) {
    case 1: {
      task = {
        description: taskOnePicture.description,
        answers: taskOnePicture.answers,
        imgFirst: imgs.paintings[getRandomInt(0, 2)],
        number: 1,
        rightAnswer: `paint`
      };
      break;
    }
    case 2: {
      task = {
        description: taskTwoPictures.description,
        answers: taskTwoPictures.answers,
        imgFirst: imgs.paintings[getRandomInt(0, 2)],
        imgSecond: imgs.photos[getRandomInt(0, 2)],
        number: 2,
        rightAnswer: [`paint`, `photo`]
      };
      break;
    }
    case 3: {
      task = {
        description: taskThreePictures.description,
        answers: taskThreePictures.answers,
        imgFirst: imgs.paintings[getRandomInt(0, 2)],
        imgSecond: imgs.photos[getRandomInt(0, 2)],
        imgThird: imgs.photos[getRandomInt(0, 2)],
        number: 3,
        rightAnswer: 1
      };
      break;
    }
  }
  return task;
};

let tasks = [];
for (let i = 0; i < NUM; i++) {
  tasks.push(createRandomTask());
}
export default tasks;
