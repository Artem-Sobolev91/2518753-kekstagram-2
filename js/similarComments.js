import {maxId,maxLikes,maxComments,message,names,description} from './data';
import {getRandomInteger} from './util';
const similarComments = Array.from({ length: maxId}, () => ({
  id: getRandomInteger(0, maxId),
  url: `photos/${ getRandomInteger(1, maxId) }.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(0, maxLikes),
  comments: Array.from({ length: getRandomInteger(0, maxComments) }, () => ({
    id: getRandomInteger(0, maxId),
    avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
    name: names[getRandomInteger(0, names.length - 1)],
    message: message[getRandomInteger(0, message.length - 1)]
  }))
}));
console.log(similarComments);
export {similarComments};
