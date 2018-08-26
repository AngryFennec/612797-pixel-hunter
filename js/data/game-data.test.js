import {assert} from 'chai';
import {countScore, addAnswer, getRandomInt} from '../game-data.js';

describe(`Check score count`, () => {

  it(`should not answer less than 10 questions `, () => {
    const answers = [];
    const livesNumber = 3;
    const score = countScore(answers, livesNumber);
    assert.equal(score, -1);
  });

  it(`should answer between 10 and 20 seconds with all lives`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      addAnswer(answers, true, getRandomInt(10, 20));
    }
    const livesNumber = 3;
    const score = countScore(answers, livesNumber);
    assert.equal(score, 1150);
  });

  it(`should answer less 10 seconds with all lives`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      addAnswer(answers, true, getRandomInt(0, 9));
    }
    const livesNumber = 3;
    const score = countScore(answers, livesNumber);
    assert.equal(score, 1650);
  });

  it(`should answer more than 20 seconds with two lives`, () => {
    const answers = [];
    for (let i = 0; i < 9; i++) {
      addAnswer(answers, true, getRandomInt(21, 30));
    }
    addAnswer(answers, false, getRandomInt(21, 30));
    const livesNumber = 2;
    const score = countScore(answers, livesNumber);
    assert.equal(score, 550);
  });

});

//  mocha.run();
