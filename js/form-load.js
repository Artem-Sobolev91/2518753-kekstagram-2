import {CLASS_NAME_HIDDEN} from'./util.js';
const imgUpload = document.querySelector('.img-upload__overlay');
const inpimgUploadOverlay = document.querySelector('.img-upload__input');
const btnImgUploadClose = document.querySelector('#upload-cancel');

function openUploadImg (){
  imgUpload.classList.remove(CLASS_NAME_HIDDEN);
}

function closeUploadImg(){
  imgUpload.classList.add(CLASS_NAME_HIDDEN);
  document.body.classList.remove('modal-open');
}

function closeUploadImgEsc(evt){
  if(evt.key === 'Escape'){
    closeUploadImg();
  }
}


inpimgUploadOverlay.addEventListener('change',() =>{
  openUploadImg ();
});

btnImgUploadClose.addEventListener('click',() =>{
  closeUploadImg();
});
document.addEventListener('keydown', closeUploadImgEsc);
