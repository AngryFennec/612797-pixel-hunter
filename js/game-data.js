const NUM = 10;
const TIME_LIMIT = 30;

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
