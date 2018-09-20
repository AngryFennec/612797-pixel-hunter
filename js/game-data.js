const LEVEL_NUMBER = 10;
const TIME_LIMIT = 30;
export const LIVES = 3;

let state = {
  level: 0,
  lives: LIVES,
  time: TIME_LIMIT,
  count: LEVEL_NUMBER,
  name: ``,
  answers: [],
  levels: []
};

export const getState = () => {
  return state;
};

export const resetInnerState = () => {
  state.answers = [];
};

export default getState;
