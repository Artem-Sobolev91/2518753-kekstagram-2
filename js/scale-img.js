
// const scaleControlInput = document.querySelector('.img-upload__scale');
const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
export const imgUploadPreview = document.querySelector('.img-upload__preview img');


const scale = {
  MIN:25,
  MAX:100,
  STEP:25
};
const updateScale = (value = scale.max) =>{
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onMinusButtonClick = ()=>{
  const currentValue = parseFloat(scaleControlValue.value);
  let newValue = currentValue - scale.STEP;
  if(newValue <= scale.MIN){
    newValue = scale.MIN;
  }
  updateScale(newValue);
};

const onPlusButtonClick = ()=>{
  const currentValue = parseFloat(scaleControlValue.value);
  let newValue = currentValue + scale.STEP;
  if(newValue > scale.MAX){
    newValue = scale.MAX;
  }
  updateScale(newValue);
};
btnSmaller.addEventListener('click', onMinusButtonClick);
btnBigger.addEventListener('click', onPlusButtonClick);
