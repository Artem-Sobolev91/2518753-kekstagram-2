<<<<<<< HEAD
=======
const maxId = 25;
const maxLikes = 200;
const maxComents = 30;
const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Артём',
  'Светлана',
  'Дмитрий',
  'Елена',
  'Игорь',
  'Мария',
  'Александр',
  'Ольга',
  'Никита',
  'Ксения'
];

const description = [
  'природа',
  'город',
  'магазин',
  'железная дорога',
  'клуб',
  'квартира',
  'парк',
  'бассейн',
  'работа',
  'офис'
];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const similarComents = Array.from({ length: getRandomInteger(1, maxComents) }, () => ({
  id: getRandomInteger(0, maxId),
  url: `photos/${ getRandomInteger(0, maxId) }.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(0, maxLikes),
  comments: [{
    id: getRandomInteger(0, maxId),
    avatar: `img/avatar-${ getRandomInteger(0, 6) }.svg`,
    name: names[getRandomInteger(0, names.length - 1)],
    message: message[getRandomInteger(0, message.length - 1)]
  }]
}));

console.log(similarComents);
>>>>>>> be1d220 (испр опечатку)
