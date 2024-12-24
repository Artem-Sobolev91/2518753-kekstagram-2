const messageFragment = document.createDocumentFragment();

const REMOVE_MESSAGE_TIMEOUT = 5000;
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error'); // нашли tpl
const errorMessageElement = errorMessageTemplate.cloneNode(true); // клонируем

export const showErrorMessage = () => {
  messageFragment.append(errorMessageElement);
  document.body.appendChild(messageFragment);
  const loadError = document.body.querySelector('.data-error');
  setTimeout(() => loadError.remove(), REMOVE_MESSAGE_TIMEOUT);
};

