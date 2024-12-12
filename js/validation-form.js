import { hasKeyEscape } from './util';
const imgUpLoadText = document.querySelector('.img-upload__text');
const hashtagInput = imgUpLoadText.querySelector('.text__hashtags');
const hashtagDescription = imgUpLoadText.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');


const pristine = new Pristine(imgUploadForm,{
  classTo:'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',

});
let errorMessege = '';
const error = ()=>errorMessege;
export const resetForm = ()=>{
  pristine.reset();
  imgUploadForm.reset();
};
const onEscape = (event)=>hasKeyEscape(event) && event.stopPropagation();

function validateHashtags(value) {
  const hashtags = value.split(' ');

  const isValidHashtag = /^#[a-zа-яё0-9()]*\s*$/i;
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
    errorMessege = 'Один или несколько хештегов не соответствуют допустимому формату.';
    return false;
  }


  if (uniqueHashtags.size !== hashtags.length) {
    errorMessege = 'Хештеги должны быть уникальными.';
    return false;
  }

  if (hashtags.length > 5) {
    errorMessege = 'Максимальное количество хештегов — 5.';
    return false;
  }

  return true;
}

pristine.addValidator(hashtagInput, validateHashtags, error);


imgUploadForm.addEventListener('submit', (event) => {


  if (!pristine.validate()) {
    event.preventDefault();
  }
});

[hashtagInput,hashtagDescription].forEach((item) => item.addEventListener('keydown',onEscape));

