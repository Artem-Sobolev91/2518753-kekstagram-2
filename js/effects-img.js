import {CLASS_NAME_HIDDEN} from'./util.js';
import {imgUploadPreview} from'./scale-img.js';

const effectsPreview = document.querySelectorAll('.effects__radio');
const effectsContainer = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

export function defaultEffects () {
  imgUploadPreview.className = '';
  imgUploadPreview.style = '';
  effectLevelValue.value = '';
  effectsContainer.classList.add(CLASS_NAME_HIDDEN);
}

noUiSlider.create(effectsContainer,{
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1
});
effectsContainer.noUiSlider.on('update', (values) => {
  effectLevelValue.value = values[0];
});

effectsPreview.forEach((effectChecked) => {
  effectChecked.addEventListener('change',()=>{
    effectsContainer.classList.remove(CLASS_NAME_HIDDEN);
    const selectEffect = effectChecked.value;
    imgUploadPreview.classList.add(`effect__preview--${selectEffect}`);

    switch(selectEffect){
      case 'chrome':
        effectsContainer.noUiSlider.updateOptions({
          range:{
            min:0,
            max:1
          },
          step:1,
          start:1
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
          start:100
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
          start:1
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
          start:3
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
          start:3
        });
        effectsContainer.noUiSlider.on('update',(evt)=>{
          imgUploadPreview.style.filter = `brightness(${evt[0]})`;
        });
        break;
      default:
        defaultEffects();
    }
  });
});
