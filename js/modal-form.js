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
  document.body.style.overflow = 'hidden';
}

function hideSuccessMessage() {
  resetForm();
  document.body.lastChild.remove();
  document.removeEventListener('click', hideSuccessMessage);
  document.removeEventListener('keydown', setEscKey);
  document.body.style.overflow = 'auto';
}

function showErrorMessage() {
  const showErrorElement = templateErrorElement.cloneNode(true);
  const errorButtonElement = showErrorElement.querySelector('.error__button');
  document.body.append(showErrorElement);
  document.addEventListener('keydown', setEscKey);
  document.addEventListener('click', hideErrorMessage);
  errorButtonElement.addEventListener('click', setErrorBnt);
  document.body.style.overflow = 'hidden';
}

function hideErrorMessage() {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', setEscKey);
  document.removeEventListener('click', hideErrorMessage);
  document.body.style.overflow = 'auto';
}

function setErrorBnt() {
  hideErrorMessage();
}

export { showSuccessMessage, showErrorMessage };
