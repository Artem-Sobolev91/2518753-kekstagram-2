import {CLASS_NAME_HIDDEN} from'./util.js';
import { resetScale } from './scale-img.js';
import{defaultEffects} from './effects-img.js';
import { resetForm } from './validation-form.js';
import { hasKeyEscape } from './util.js';
export const imgUpload = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const btnImgUploadClose = document.querySelector('#upload-cancel');


function openUploadImg (){
  imgUpload.classList.remove(CLASS_NAME_HIDDEN);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeUploadImgEsc);
  btnImgUploadClose.addEventListener('click',closeUploadImg);
}

function closeUploadImg(){
  imgUpload.classList.add(CLASS_NAME_HIDDEN);
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  resetForm();
  defaultEffects();
  resetScale();
  uploadFile.removeEventListener('click',closeUploadImg);
  document.removeEventListener('keydown', closeUploadImg);
}

function closeUploadImgEsc(evt){
  hasKeyEscape(evt) && closeUploadImg();
}

uploadFile.addEventListener('change',() =>{
  openUploadImg ();
});

