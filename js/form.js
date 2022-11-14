const adForm = document.querySelector('.ad-form');
const formDisabled = adForm.querySelectorAll('fieldset');

const turnOffForm = () => {
  adForm.classList.add('ad-form--disabled');
  formDisabled.forEach((form) => {
    form.disabled = true;
  });
};

const turnOnForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formDisabled.forEach((form) => {
    form.disabled = false;
  });
};

export {turnOffForm, turnOnForm};
