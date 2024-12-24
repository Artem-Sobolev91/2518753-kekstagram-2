import { showErrorMessage } from './messages';

export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA:'/data',
  SEND_DATA:'/',
};

const Method = {
  GET:'GET',
  POST:'POST',
};

const ErrorText = {
  [Method.Get]:'Не удалось загрузить данные. Попробуйте еще раз',
  [Method.POST]:'Не удалось отправить данные формы',
};
const load = (route, method = Method.GET, body = null)=>
  fetch(`${BASE_URL}${route}`, {method,body})
    .then((response)=>
      response.ok ? response.json() : Promise.reject(ErrorText[method])
    );

export const getData = ()=>load(Route.GET_DATA).catch(showErrorMessage);

export const sendData = (body)=>load(Route.SEND_DATA,Method.POST,body);
