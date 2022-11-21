import { catchMainPinCoords } from './map.js';

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
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const numberOfRooms = adFormElement.querySelector('#room_number');
const numberOfGuests = adFormElement.querySelector('#capacity');
const fieldInputPrice = adFormElement.querySelector('#price');
const typeOfRend = adFormElement.querySelector('#type');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const addressElement = adFormElement.querySelector('#address');
const sliderElement = adFormElement.querySelector('.ad-form__slider');

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
  fieldInputPrice.value = sliderElement.noUiSlider.get();
  pristine.validate(fieldInputPrice);
});

//----------------------------------------Call back for coordinates-----------------------------

const adress = (coordinates) => {
  addressElement.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
  pristine.validate(addressElement);
};
catchMainPinCoords(adress);


//----------------------------------------Errors Messages---------------------------------------

const getErrorRooms = () =>
  `Для указанного количества гостей нужно ${GUESTS[numberOfGuests.value]} комнат`;

const getErrorGuests = () =>
  `Указанное количество комнат вмещает ${ROOMS[numberOfRooms.value]} человек`;

const getErrorPrice = () =>
  `Минимальная сумма составляет ${fieldInputPrice.min} руб.`;


//--------------------------------Functions for pristive validation------------------------------

const compareValues = () =>
  ROOMS[numberOfRooms.value].includes(numberOfGuests.value);

const checkRoomsChanges = () => {
  pristine.validate(numberOfGuests);
  pristine.validate(numberOfRooms);
};

const checkGuestsChanges = () => {
  pristine.validate(numberOfGuests);
  pristine.validate(numberOfRooms);
};

const changeRentPrice = () => {
  fieldInputPrice.placeholder = MIN_RENT_COST[typeOfRend.value];
  fieldInputPrice.min = MIN_RENT_COST[typeOfRend.value];
  return +fieldInputPrice.value >= +fieldInputPrice.min;
};

//----------------------------------------Event Listeners----------------------------------------

numberOfRooms.addEventListener('change', checkRoomsChanges);
numberOfGuests.addEventListener('change', checkGuestsChanges);
timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});
timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});
typeOfRend.addEventListener('change', () => {
  changeRentPrice();
  pristine.validate(fieldInputPrice);
});

//----------------------------------------Turn form on\off----------------------------------------

const turnFormOff = () => {
  adFormElement.classList.add('ad-form--disabled');
  fieldsetElements.forEach((form) => {
    form.disabled = true;
  });
};

const turnFormOn = () => {
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetElements.forEach((form) => {
    form.disabled = false;
  });
};

//----------------------------------------add validators------------------------------------------

pristine.addValidator(numberOfRooms, compareValues, getErrorRooms);
pristine.addValidator(numberOfGuests, compareValues, getErrorGuests);
pristine.addValidator(fieldInputPrice, changeRentPrice, getErrorPrice);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    pristine.getErrors();
  }
});

export {turnFormOff, turnFormOn};
