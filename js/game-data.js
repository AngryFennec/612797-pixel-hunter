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
export let state = {
  level: 0,
  lives: 3,
  time: 30,
  answers: {
    1: ``,
    2: ``,
    3: ``,
    4: ``,
    5: ``,
    6: ``,
    7: ``,
    8: ``,
    9: ``,
    10: ``
  },
  levels: []
};
/*
export const tick = (obj) => {
  state = Object.assign({}, state, {
    time: state.time - 1
  });
  if (state.time === 0) {
    state = Object.assign({}, state, {
      lives: state.lives - 1
    });
    if (state.lives > 0) {
      obj.changeToNextLevel();
    } else {
      obj.finish(state);
    }
  } else {
    obj.renewTimer(state);
  }
};

let timer;

export const startTimer = (obj) => {
  obj.renewTimer(state);
  timer = setTimeout(() => {
    tick(obj);
    startTimer(obj);
  }, ONE_SECOND);
};

export const stopTimer = () => {
  state = Object.assign({}, state, {
    time: TIME_LIMIT
  });
  clearTimeout(timer);
};
*/
export const resetState = () => {
  state = Object.assign({}, state, {
    lives: 3,
    answers: {
      1: ``,
      2: ``,
      3: ``,
      4: ``,
      5: ``,
      6: ``,
      7: ``,
      8: ``,
      9: ``,
      10: ``
    }
  });
};
export default state;
