import { showErrorMessage } from './messages.js';
import { getData } from './api.js';
import { creatPhotos } from './create-photos.js';
import { configFilter } from './img-filter.js';
import './load-form.js';
import './validation-form.js';

getData().then((pictures) => {
  creatPhotos(pictures);
  configFilter(pictures);
}).catch(showErrorMessage);

