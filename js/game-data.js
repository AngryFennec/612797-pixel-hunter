const LEVEL_NUMBER = 10;
const TIME_LIMIT = 30;
export const LIVES = 3;

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
};

export const resetInnerState = () => {
  for (let i = 0; i < state.count; i++) {
    state.answers[i] = ``;
  }
};

export default getState;
