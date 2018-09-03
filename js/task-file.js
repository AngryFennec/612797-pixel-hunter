const NUM = 10;
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

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
