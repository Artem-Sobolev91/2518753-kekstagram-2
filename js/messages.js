const messageFragment = document.createDocumentFragment();
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const REMOVE_MESSAGE_TIMEOUT = 5000;
const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageSuccessElement = messageSuccessTemplate.cloneNode(true);
const errorLoadImgTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoadImgElement = errorLoadImgTemplate.cloneNode(true);

export const showErrorMessage = ()=>{
  messageFragment.append(errorMessageElement);
  document.body.appendChild(messageFragment);
  const loadError = document.body.querySelector('.data-error');
  setTimeout(()=>loadError.remove(),REMOVE_MESSAGE_TIMEOUT);
};


export const showSuccessMessage = ()=>{
  messageFragment.append(messageSuccessElement);
  document.body.appendChild(messageFragment);
  const loadSuccess = document.body.querySelector('.success');
  const btnCloseSuccess = document.body.querySelector('.success__button');
  const removeMessage = ()=>{
    loadSuccess.remove();
  };
  const removeMessageEsc = (event)=>{
    if (event.key === 'Escape') {
      loadSuccess.remove();
    }
  };
  document.addEventListener('keydown',removeMessageEsc);
  btnCloseSuccess.addEventListener('click',removeMessage);
  setTimeout(()=> loadSuccess.remove(), REMOVE_MESSAGE_TIMEOUT);
  loadSuccess.addEventListener('click', removeMessage);
};


export const showErrorImgLoad = ()=>{
  messageFragment.append(errorLoadImgElement);
  document.body.appendChild(messageFragment);
  const loadErrorImg = document.body.querySelector('.error');
  const btnloadErrorImg = document.body.querySelector('.error__button');
  const removeErrorImg = ()=>{
    loadErrorImg.remove();
  };
  const removeErrorImgEsc = (event)=>{
    if (event.key === 'Escape') {
      loadErrorImg.remove();
    }
  };
  document.addEventListener('keydown',removeErrorImgEsc);
  btnloadErrorImg.addEventListener('click',removeErrorImg);
};
