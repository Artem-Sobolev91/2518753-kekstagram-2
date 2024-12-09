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
const effectsContainer = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');


noUiSlider.create(effectsContainer,{
  range: {
    min: 0,
    max: 1

  },
  start: 1,
  step: 0.1
});
effectsContainer.noUiSlider.on('update', (values) => {
  effectLevelValue.value = values[0];
});

effectsPreview.forEach((effectChecked) => {
  effectChecked.addEventListener('change',()=>{
    const selectEffect = effectChecked.value;
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add(`effect__preview--${selectEffect}`);


    if (selectEffect !== 'none') {
      imgUploadPreview.classList.add(`effect__preview--${selectEffect}`);

      switch(selectEffect){
        case 'chrome':
          effectsContainer.noUiSlider.updateOptions({
            range:{
              min:0,
              max:1
            },
            step:0.1,
            start:0

          });
          effectsContainer.noUiSlider.on('update',(evt)=>{
            imgUploadPreview.style.filter = `grayscale(${evt[0]})`;
          });
          break;
        case 'marvin':
          effectsContainer.noUiSlider.updateOptions({
            range:{
              min:0,
              max:100
            },
            step:1,
            start:0

          });
          effectsContainer.noUiSlider.on('update',(evt)=>{
            imgUploadPreview.style.filter = `invert(${evt[0]}%)`;
          });
          break;

        case'sepia':
          effectsContainer.noUiSlider.updateOptions({
            range:{
              min:0,
              max:1
            },
            step:0.1,
            start:0

          });
          effectsContainer.noUiSlider.on('update',(evt)=>{
            imgUploadPreview.style.filter = `sepia(${evt[0]})`;
          });
          break;

        case'phobos':
          effectsContainer.noUiSlider.updateOptions({
            range:{
              min:0,
              max:3
            },
            step:0.1,
            start:0

          });
          effectsContainer.noUiSlider.on('update',(evt)=>{
            imgUploadPreview.style.filter = `blur(${evt[0]}px)`;
          });
          break;

        case'heat':
          effectsContainer.noUiSlider.updateOptions({
            range:{
              min:1,
              max:3
            },
            step:0.1,
            start:0

          });
          effectsContainer.noUiSlider.on('update',(evt)=>{
            imgUploadPreview.style.filter = `brightness(${evt[0]})`;
          });
          break;

        default:
      }
    } else {
      imgUploadPreview.classList.remove(`effect__preview--${selectEffect}`);
      imgUploadPreview.style.filter = '';
      effectsContainer.noUiSlider.updateOptions({
        range:{
          min:0,
          max:0
        },
        step:0,
        start:0

      });
    }

  });

});


// function updateEffectLevel(filters,parametrScale){
//   const parametr = effectsContainer.noUiSlider.get();
//   imgUploadPreview.style[filter] = `${parametrScale}(${(parametr)})`;
// }


// Обновление стилей изображения:
// Создайте функцию, которая будет обновлять стиль фильтра изображения на основе выбранного эффекта и значения ползунка.
// Для каждого эффекта используйте соответствующий CSS-фильтр (например, grayscale, sepia, invert, blur, brightness).


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
