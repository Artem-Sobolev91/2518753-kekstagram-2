import {CLASS_NAME_HIDDEN} from'./util.js';
const imgUpload = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const btnImgUploadClose = document.querySelector('#upload-cancel');
const imgupLoadText = document.querySelector('.img-upload__text');
const hashtagInput = imgupLoadText.querySelector('.text__hashtags');
const hashtagDescription = imgupLoadText.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
// масштаб
const scaleControlInput = document.querySelector('.img-upload__scale');
const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
// фильтры
const effectsPreview = document.querySelectorAll('.effects__radio');
const effectPreview = document.querySelector('.effects__preview');

const imgUploadEffect = document.querySelector('.effect-level__value');
const effectsChrome = document.querySelector('#effect-chrome');
const effectsSepia = document.querySelector('#effect-sepia');
const effectsMarvin = document.querySelector('#effect-marvin');
const effectsPhobos = document.querySelector('#effect-phobos');
const effectsHeat = document.querySelector('#effect-heat');
const effectsNone = document.querySelector('#effect-none');


noUiSlider.create(imgUploadEffect,{
  range: {
    min: 0,
    max: 1
  },
  start: 0.5,
  step: 0.1
});

function updateEffectLevel(parametrEffect){
  const effectValue = parseFloat(parametrEffect[0]);
  imgUploadPreview.style.filter = `${parametrEffect}(${effectValue})`;
}

effectsPreview.forEach((effectChecked) => {
  effectChecked.onchange = function() {
    effectsPreview.forEach((effect) => {
      imgUploadPreview.classList.remove(`effects__preview--${effect.value}`);
    });

    imgUploadPreview.classList.add(`effects__preview--${effectChecked.value}`);
  };
});

// масштаб
noUiSlider.create(scaleControlInput,{
  range: {
    min: 0,
    max: 100

  },
  start: 100,
  step: 25
});

function updateScale(){
  const scaleValue = parseFloat(scaleControlValue.value) / 100;
  imgUploadPreview.style.transform = `scale(${scaleValue})`;
}
scaleControlInput.noUiSlider.on('update', () => {
  scaleControlValue.value = `${scaleControlInput.noUiSlider.get()}`;
});

btnSmaller.addEventListener('click',() =>{
  scaleControlInput.noUiSlider.set(scaleControlInput.noUiSlider.get(true) - 25);
  updateScale();
});
btnBigger.addEventListener('click', () => {
  scaleControlInput.noUiSlider.set(scaleControlInput.noUiSlider.get(true) + 25);
  updateScale();
});


// валидатор
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
  classTo:'img-upload__field-wrapper',
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
