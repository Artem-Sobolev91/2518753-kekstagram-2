const imgupLoadText = document.querySelector('.img-upload__text');
const hashtagInput = imgupLoadText.querySelector('.text__hashtags');
const hashtagDescription = imgupLoadText.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
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
