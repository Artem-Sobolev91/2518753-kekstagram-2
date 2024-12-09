import {CLASS_NAME_HIDDEN} from'./util.js';
const imgUpload = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const btnImgUploadClose = document.querySelector('#upload-cancel');
const imgupLoadText = document.querySelector('.img-upload__text');
const hashtagInput = imgupLoadText.querySelector('.text__hashtags');
const hashtagDescription = imgupLoadText.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
function openUploadImg (){
  imgUpload.classList.remove(CLASS_NAME_HIDDEN);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeUploadImgEsc);
  btnImgUploadClose.addEventListener('click',() =>{
    closeUploadImg();
  });
}

function closeUploadImg(){
  imgUpload.classList.add(CLASS_NAME_HIDDEN);
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  uploadFile.removeEventListener('click',closeUploadImg);
  document.removeEventListener('keydown', closeUploadImgEsc);
}

function closeUploadImgEsc(evt){
  if(evt.key === 'Escape'){
    closeUploadImg();
  }
}

uploadFile.addEventListener('change',() =>{
  openUploadImg ();
});
hashtagInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});
hashtagDescription.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

const pristine = new Pristine(imgupLoadText,{
  classTo:'img-upload__text',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

function validateHashtags(value) {
  const hashtags = value.split(' ');
  const isValidHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set(hashtags);

  if (!value.trim()) {
    return true;
  }

  if (!hashtagInput.pristine) {
    hashtagInput.pristine = {};
  }
  if (!hashtagInput.pristine.errors) {
    hashtagInput.pristine.errors = [];
  }

  if (!hashtags.every((hashtag) => isValidHashtag.test(hashtag))) {
    pristine.addError(hashtagInput, 'Один или несколько хештегов не соответствуют допустимому формату.');
    return false;
  }


  if (uniqueHashtags.size !== hashtags.length) {
    pristine.addError(hashtagInput, 'Хештеги должны быть уникальными.');
    return false;
  }

  if (hashtags.length > 5) {
    pristine.addError(hashtagInput, 'Максимальное количество хештегов — 5.');
    return false;
  }

  return true;
}

pristine.addValidator(hashtagInput, validateHashtags, 'Неправильный хэштег');

function validateDescription(value) {
  const maxLengthComment = 140;

  if (!value.trim()) {
    return true;
  }

  return value.length <= maxLengthComment;

}

pristine.addValidator(hashtagDescription, validateDescription, 'Неправильная длина комментария');


imgUploadForm.addEventListener('submit', (event) => {
  const isHashtagsValid = pristine.validate(hashtagInput);
  const isDescriptionValid = pristine.validate(hashtagDescription);

  if (!isHashtagsValid || !isDescriptionValid) {
    event.preventDefault();
    alert('Пожалуйста, исправьте ошибки в форме.');
  }
});
