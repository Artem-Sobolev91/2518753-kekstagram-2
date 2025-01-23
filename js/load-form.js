import { CLASS_NAME_HIDDEN, hasKeyEscape } from './util.js';
import { resetScale, imgUploadPreview } from './scale-img.js';
import { defaultEffects } from './effects-img.js';
import { resetForm } from './validation-form.js';


export const imgUpload = document.querySelector('.img-upload__overlay');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadFile = document.querySelector('#upload-file');
const btnImgUploadClose = document.querySelector('#upload-cancel');

export const closeUploadImg = () => {
  imgUpload.classList.add(CLASS_NAME_HIDDEN);
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  defaultEffects();
  resetScale();
  resetForm();
  uploadFile.removeEventListener('click', closeUploadImg);
  document.removeEventListener('keydown', closeUploadImg);
};
const closeUploadImgEsc = (evt) => hasKeyEscape(evt) && closeUploadImg();

const openUploadImg = () => {
  imgUpload.classList.remove(CLASS_NAME_HIDDEN);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeUploadImgEsc);
  btnImgUploadClose.addEventListener('click', closeUploadImg);
  defaultEffects();
};


uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    imgUploadPreview.src = fileUrl;
    effectsPreviewImg.forEach((img) => {
      img.style.backgroundImage = `url(${fileUrl})`;
    });
    openUploadImg();
  }
});

