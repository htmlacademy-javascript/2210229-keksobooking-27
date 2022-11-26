import { resetForm } from './form.js';
const KEY_ESC = 'Escape';

const templateSuccessElement = document.querySelector('#success').content.querySelector('.success');
const templateErrorElement = document.querySelector('#error').content.querySelector('.error');


function setEscKey(evt) {
  if (evt.key === KEY_ESC) {
    evt.preventDefault();
    if (document.body.lastChild.classList.contains('success')) {
      hideSuccessMessage();
    } else {
      hideErrorMessage();
    }
  }
}

function showSuccessMessage() {
  const showSuccessElement = templateSuccessElement.cloneNode(true);
  document.body.append(showSuccessElement);
  document.addEventListener('keydown', setEscKey);
  document.addEventListener('click' , hideSuccessMessage);
}

function hideSuccessMessage() {
  resetForm();
  document.body.lastChild.remove();
  document.removeEventListener('click', hideSuccessMessage);
  document.removeEventListener('keydown', setEscKey);
}

function showErrorMessage() {
  const showErrorElement = templateErrorElement.cloneNode(true);
  const errorButtonElement = showErrorElement.querySelector('.error__button');
  document.body.append(showErrorElement);
  document.addEventListener('keydown', setEscKey);
  document.addEventListener('click', hideErrorMessage);
  errorButtonElement.addEventListener('click', setErrorBnt);
}

function hideErrorMessage() {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', setEscKey);
  document.removeEventListener('click', hideErrorMessage);
}

function setErrorBnt() {
  hideErrorMessage();
}

export { showSuccessMessage, showErrorMessage };
