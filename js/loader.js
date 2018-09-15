import GameModel from './game-model.js';
const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `o0`;
const APP_ID = 22101985;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    let dataToSend = {
      answers: [],
      lives: GameModel.state.lives
    };
    for (let i = 0; i < GameModel.state.count; i++) {
      dataToSend.answers.push(GameModel.state.answers[i]);
    }

    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${data.name}`, requestSettings).then(checkStatus);
  }
}
