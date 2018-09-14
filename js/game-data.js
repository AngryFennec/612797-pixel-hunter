const NUM = 10;
const LEVEL_NUMBER = 10;
const TIME_LIMIT = 30;
export const LIVES = 3;
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
  if (level > LEVEL_NUMBER) {
    throw new Error(`Level should not be greater than LEVEL_NUMBER`);
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

let state = {
  level: 0,
  lives: LIVES,
  time: TIME_LIMIT,
  count: LEVEL_NUMBER,
  name: ``,
  answers: {
    0: ``,
    1: ``,
    2: ``,
    3: ``,
    4: ``,
    5: ``,
    6: ``,
    7: ``,
    8: ``,
    9: ``
  },
  levels: []
};

export const getState = () => {
  return state;
}
export const resetInnerState = () => {
  for (let i = 0; i < state.count; i++) {
    state.answers[i] = ``;
  }
}

export default getState;
