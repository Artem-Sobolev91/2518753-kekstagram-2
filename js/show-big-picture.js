import {CLASS_NAME_HIDDEN,hasKeyEscape} from'./util.js';

const bigWindow = document.querySelector('.big-picture');
const bigWindowImg = bigWindow .querySelector('.big-picture__img img');
const bigWindowLikes = bigWindow .querySelector('.likes-count');
const btnWindowCancel = bigWindow.querySelector('.big-picture__cancel');
const bigWindowTotalComment = bigWindow .querySelector('.social__comment-total-count');
const bigWindowComments = bigWindow.querySelector('.social__comments');
const socialCaption = bigWindow.querySelector('.social__caption');
const commentsLoader = bigWindow.querySelector('.comments-loader');
const btnCommentsLoader = bigWindow.querySelector('.comments-loader');
const socialCommentShownCount = bigWindow.querySelector('.social__comment-shown-count');
function closeBigPicture(){
  bigWindow.classList.add(CLASS_NAME_HIDDEN);
  document.body.classList.remove('modal-open');
}


function closeBigPictureEsc(evt){
  hasKeyEscape(evt) && closeBigPicture();
}


function currentListComments(comments) {
  let currentIndex = 0;
  const commentsPerPage = 5;
  const totalComments = comments.length;

  function renderComments() {
    const currentList = comments.slice(currentIndex, currentIndex + commentsPerPage);

    currentList.forEach(({ id, avatar, name, message }) => {
      bigWindowComments.insertAdjacentHTML('beforeend', `
              <li class="social__comment" id="comment-${id}">
                  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
                  <p class="social__text">${message}</p>
              </li>
          `);
    });

    currentIndex += currentList.length;

    socialCommentShownCount.textContent = currentIndex;
    if (currentIndex >= totalComments) {
      btnCommentsLoader.style.display = 'none';
    } else{
      btnCommentsLoader.style.display = 'block';
    }
  }

  btnCommentsLoader.addEventListener('click', renderComments);
  renderComments();
}


export const showBigPicture = ({url, description, likes, comments})=>{
  bigWindow.classList.remove(CLASS_NAME_HIDDEN);
  commentsLoader.classList.remove(CLASS_NAME_HIDDEN);

  bigWindowComments.innerHTML = '';
  bigWindowImg.src = url;
  bigWindowLikes.textContent = likes;
  bigWindowTotalComment.textContent = comments.length;
  socialCaption.textContent = description;
  document.body.classList.add('modal-open');
  currentListComments (comments);

  btnWindowCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeBigPictureEsc);

};
