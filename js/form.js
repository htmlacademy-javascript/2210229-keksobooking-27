import { catchMainPinCoords, resetCoordinates } from './map.js';
import { sentData } from './api.js';
import { showAlert } from './util.js';
import { showSuccessMessage } from './modal-form.js';

const ROOMS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const GUESTS = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

const MIN_RENT_COST = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

//----------------------------------------querySelectors----------------------------------------

const adFormElement = document.querySelector('.ad-form');
const fieldsetElement = adFormElement.querySelectorAll('fieldset');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const priceElement = adFormElement.querySelector('#price');
const typeElement = adFormElement.querySelector('#type');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const addressElement = adFormElement.querySelector('#address');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');

//----------------------------------------Pristine----------------------------------------------

const pristine = new Pristine(
  adFormElement,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);

//----------------------------------------noUiSlider--------------------------------------------

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  connect: 'lower',
  start: 0,
  step: 1,
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceElement);
});

const setValueFromInputToSlider = () => {
  sliderElement.noUiSlider.set(priceElement.value);
  pristine.validate(priceElement);
};

//----------------------------------------Call back for coordinates-----------------------------

const adress = (coordinates) => {
  addressElement.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
  pristine.validate(addressElement);
};
catchMainPinCoords(adress);

//----------------------------------------Errors Messages---------------------------------------

const getErrorRooms = () =>
  `Для указанного количества гостей нужно ${GUESTS[capacityElement.value]} комнат`;

const getErrorGuests = () =>
  `Указанное количество комнат вмещает ${ROOMS[roomNumberElement.value]} человек`;

const getErrorPrice = () =>
  `Минимальная сумма составляет ${priceElement.min} руб.`;

//--------------------------------Functions for pristive validation------------------------------

const compareValues = () =>
  ROOMS[roomNumberElement.value].includes(capacityElement.value);

const checkRoomsChanges = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const checkGuestsChanges = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const changeRentPrice = () => {
  priceElement.placeholder = MIN_RENT_COST[typeElement.value];
  priceElement.min = MIN_RENT_COST[typeElement.value];
  return +priceElement.value >= +priceElement.min;
};

//----------------------------------------Event Listeners----------------------------------------

roomNumberElement.addEventListener('change', checkRoomsChanges);
capacityElement.addEventListener('change', checkGuestsChanges);
timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});
timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});
typeElement.addEventListener('change', () => {
  changeRentPrice();
  pristine.validate(priceElement);
});
priceElement.addEventListener('change', setValueFromInputToSlider);
resetButtonElement.addEventListener('click', resetForm);

//----------------------------------------Turn form on\off----------------------------------------

const turnFormOff = () => {
  adFormElement.classList.add('ad-form--disabled');
  fieldsetElement.forEach((form) => {
    form.disabled = true;
  });
};

const turnFormOn = () => {
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetElement.forEach((form) => {
    form.disabled = false;
  });
};

//----------------------------------------add validators------------------------------------------

pristine.addValidator(roomNumberElement, compareValues, getErrorRooms);
pristine.addValidator(capacityElement, compareValues, getErrorGuests);
pristine.addValidator(priceElement, changeRentPrice, getErrorPrice);

//----------------------------------------modal functions------------------------------------------

function blockSubmitButton() {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Идёт отправка';
}

function unblockSubmitButton() {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
}

function resetForm() {
  adFormElement.reset();
  pristine.reset();
  resetCoordinates();
  sliderElement.noUiSlider.set('');
}

const setUserFormSubmit = () => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sentData(
        () => {
          showSuccessMessage();
          unblockSubmitButton();
          console.log('hi hi');
        },
        () => {
          showAlert('Не удалось отправить форму. Пожалуйста, повторите попытку');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { turnFormOff, turnFormOn, setUserFormSubmit, resetForm };
