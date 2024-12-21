import { userPhotos } from './data.js';
import { showBigPicture } from './show-big-picture.js';
import{getData} from'./api.js';


const photoListFragment = document.createDocumentFragment();
const template = document.querySelector('#picture');
const picturesContainer = document.querySelector('.pictures');


getData().then ((data)=>{
  console.log(data);


  const similar = data;
  similar.forEach(({url, description, likes, comments}) => {
    console.log(url);
    const templateClone = template.content.cloneNode(true);
    const picture = templateClone.querySelector('.picture');
    const img = templateClone.querySelector('.picture__img');
    img.src = url;
    img.alt = description;
    templateClone.querySelector('.picture__likes').textContent = likes;
    templateClone.querySelector('.picture__comments').textContent = comments.length;
    console.log(comments.length);
    photoListFragment.append(templateClone);
    picture.addEventListener('click', () =>{
      showBigPicture({url, description, likes, comments});
    });
  });
  picturesContainer.append(photoListFragment);
}).catch((error)=>{
  console.error(error);
});
